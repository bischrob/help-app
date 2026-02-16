import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { theme } from './theme';

const MarkdownViewer = () => {
  const { docId = 'index' } = useParams();
  const [content, setContent] = useState('Loading documentation...');

  useEffect(() => {
    fetch(`/docs/${docId}.md`)
      .then(res => res.ok ? res.text() : '# 404\nDocument not found')
      .then(text => setContent(text))
      .catch(() => setContent('Error loading document.'));
  }, [docId]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};

function App() {
  const drawerWidth = 240;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [navLinks, setNavLinks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/docs/sidebar.json`)
      .then(res => {
        if (!res.ok) throw new Error("Sidebar config not found");
        return res.json();
      })
      .then(data => setNavLinks(data.docs))
      .catch(err => {
        console.error("Error loading sidebar:", err);
        setNavLinks([{ title: "Home", id: "index" }]);
      });
  }, []);

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${item.id}`}
              onClick={handleNavClick}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
                aria-label="open navigation"
              >
                <Box component="span" sx={{ fontSize: '1.5rem', lineHeight: 1 }}>
                  ≡
                </Box>
              </IconButton>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                CatMapper Help Center
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              width: drawerWidth,
              display: { xs: 'block', sm: 'none' },
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            {drawerContent}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              display: { xs: 'none', sm: 'block' },
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            open
          >
            {drawerContent}
          </Drawer>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              px: { xs: 0, sm: 3 },
              pb: { xs: 3, sm: 4 },
            }}
          >
            <Toolbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Box
                    sx={{
                      overflowWrap: 'anywhere',
                      '& img': { maxWidth: '100%', height: 'auto' },
                      '& pre': { overflowX: 'auto', maxWidth: '100%' },
                      '& table': { display: 'block', overflowX: 'auto', maxWidth: '100%' },
                      '@media (max-width:600px)': {
                        '& img': { display: 'block', width: '100%', marginBottom: 2 },
                      },
                    }}
                  >
                    <MarkdownViewer />
                  </Box>
                }
              />
              <Route
                path="/:docId"
                element={
                  <Box
                    sx={{
                      overflowWrap: 'anywhere',
                      '& img': { maxWidth: '100%', height: 'auto' },
                      '& pre': { overflowX: 'auto', maxWidth: '100%' },
                      '& table': { display: 'block', overflowX: 'auto', maxWidth: '100%' },
                      '@media (max-width:600px)': {
                        '& img': { display: 'block', width: '100%', marginBottom: 2 },
                      },
                    }}
                  >
                    <MarkdownViewer />
                  </Box>
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
