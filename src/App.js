import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
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

  const [navLinks, setNavLinks] = useState([]);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Box sx={{ display: 'flex' }}>

          {/* AppBar Code */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap>CatMapper Help Center</Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {navLinks.map((item) => (
                  <ListItem
                    button
                    key={item.id}
                    component={Link}
                    to={`/${item.id}`}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Routes>
              <Route path="/" element={<MarkdownViewer />} />
              <Route path="/:docId" element={<MarkdownViewer />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;