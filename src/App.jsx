import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link as RouterLink } from 'react-router-dom';
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
  useMediaQuery,
  Divider,
  Link as MuiLink
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import catmapperJsPackage from './catmapperjs-package.json';
import { theme } from './theme';

const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const withBasePath = (path) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

const slugifyHeading = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const MarkdownViewer = ({ onHeadingsChange }) => {
  const { docId = 'index' } = useParams();
  const [content, setContent] = useState('Loading documentation...');
  const contentRef = useRef(null);

  useEffect(() => {
    onHeadingsChange?.([]);
    fetch(withBasePath(`/docs/${encodeURIComponent(docId)}.md`))
      .then(res => res.ok ? res.text() : '# 404\nDocument not found')
      .then(text => setContent(text))
      .catch(() => setContent('Error loading document.'));
  }, [docId, onHeadingsChange]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const seen = new Map();
    const headings = [];
    root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((node) => {
      const text = (node.textContent || '').trim();
      if (!text) return;
      const base = slugifyHeading(text) || 'section';
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      const slug = count === 0 ? base : `${base}-${count + 1}`;
      node.id = slug;
      headings.push({
        id: slug,
        text,
        level: Number(node.tagName.replace('H', '')) || 1,
      });
    });
    onHeadingsChange?.(headings);
  }, [content, docId, onHeadingsChange]);

  return (
    <Box ref={contentRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};

const footerLinks = [
  { name: 'About', url: 'https://catmapper.org/about' },
  { name: 'People', url: 'https://catmapper.org/people' },
  { name: 'News', url: 'https://catmapper.org/news' },
  { name: 'Funding', url: 'https://catmapper.org/funding' },
  { name: 'Citation', url: 'https://catmapper.org/citation' },
  { name: 'Terms', url: 'https://catmapper.org/terms' },
  { name: 'Privacy', url: 'https://catmapper.org/privacy' },
  { name: 'Contact', url: 'https://catmapper.org/contact' },
  { name: 'Download', url: 'https://catmapper.org/download' },
];

const markdownContainerSx = {
  width: '100%',
  maxWidth: '800px',
  mx: 'auto',
  overflowWrap: 'anywhere',
  '& img': { maxWidth: '100%', height: 'auto' },
  '& pre': { overflowX: 'auto', maxWidth: '100%' },
  '& table': {
    display: 'block',
    overflowX: 'auto',
    maxWidth: '100%',
    borderCollapse: 'collapse',
  },
  '& th, & td': {
    border: '1px solid rgba(0, 0, 0, 0.25)',
    padding: '0.45rem 0.6rem',
    overflowWrap: 'normal',
    wordBreak: 'normal',
    verticalAlign: 'top',
  },
  '& th:first-of-type, & td:first-of-type': {
    minWidth: '140px',
  },
  '& thead th': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  '@media (max-width:600px)': {
    '& img': { display: 'block', width: '100%', marginBottom: 2 },
  },
};

function App() {
  const drawerWidth = 240;
  const navbarBlack = theme.palette.primary.main;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [navLinks, setNavLinks] = useState([]);
  const [pageHeadings, setPageHeadings] = useState([]);
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
    fetch(withBasePath('/docs/sidebar.json'))
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
    <Box sx={{ overflow: 'auto', bgcolor: navbarBlack, color: '#fff', minHeight: '100%' }}>
      <Box sx={{ p: 0, m: 0, display: 'block', lineHeight: 0 }}>
        <Box
          component="img"
          src={withBasePath('/media/help_logo_trimmed.webp')}
          alt="CatMapper help logo"
          sx={{ width: '100%', maxWidth: 'none', height: 'auto', display: 'block' }}
        />
      </Box>
      <List>
        {navLinks.map((item, index) => {
          const key = item.id || item.href || `${item.title}-${index}`;
          if (item.href) {
            return (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={handleNavClick}
                  sx={{
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: 700,
                      textDecoration: 'underline',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          }

          return (
            <ListItem key={key} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={`/${item.id}`}
                onClick={handleNavClick}
                sx={{
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={BASE_PATH || undefined}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>

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
              <MuiLink href="https://catmapper.org" aria-label="CatMapper home" sx={{ display: 'inline-flex', mr: 2 }}>
                <Box
                  component="img"
                  src={withBasePath('/media/catmapper_small.webp')}
                  alt="CatMapper logo"
                  sx={{
                    width: 250,
                    height: 'auto',
                    display: 'block',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </MuiLink>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1, minWidth: 0 }}>
                CatMapper Help Center
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, ml: 2 }}>
                <MuiLink href="https://catmapper.org" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                  CatMapper Home
                </MuiLink>
                <MuiLink href="https://catmapper.org/sociomap" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                  SocioMap
                </MuiLink>
                <MuiLink href="https://catmapper.org/archamap" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                  ArchaMap
                </MuiLink>
              </Box>
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
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                bgcolor: navbarBlack,
                color: '#fff',
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              display: { xs: 'none', sm: 'block' },
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                bgcolor: navbarBlack,
                color: '#fff',
              },
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
              bgcolor: '#fff',
              px: { xs: 0, sm: 2, lg: 3 },
              pb: { xs: 3, sm: 4 },
            }}
          >
            <Toolbar />
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 0, md: 2, lg: 3 } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Box sx={markdownContainerSx}>
                        <MarkdownViewer onHeadingsChange={setPageHeadings} />
                      </Box>
                    }
                  />
                  <Route
                    path="/:docId"
                    element={
                      <Box sx={markdownContainerSx}>
                        <MarkdownViewer onHeadingsChange={setPageHeadings} />
                      </Box>
                    }
                  />
                </Routes>
              </Box>
              <Box
                component="aside"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  width: 260,
                  position: 'sticky',
                  top: 84,
                  maxHeight: 'calc(100vh - 96px)',
                  overflowY: 'auto',
                  bgcolor: '#fff',
                  borderLeft: '1px solid #e0e0e0',
                  pl: 2,
                  pr: 1,
                  pt: 1,
                  flexShrink: 0,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  On This Page
                </Typography>
                <List dense disablePadding>
                  {pageHeadings.map((heading) => (
                    <ListItem key={heading.id} disablePadding>
                      <ListItemButton
                        component="a"
                        href={`#${heading.id}`}
                        sx={{
                          pl: Math.max(0, (heading.level - 1) * 1.5),
                          py: 0.25,
                          minHeight: 30,
                        }}
                      >
                        <ListItemText
                          primary={heading.text}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            lineHeight: 1.25,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
          </Box>
          <Box component="footer" sx={{ width: '100%', position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 2 }}>
            <Divider sx={{ mt: 2, mb: 0 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                mt: 0,
                mb: 0,
                px: 2,
                py: 2,
                bgcolor: navbarBlack,
                color: 'white',
                gap: 2,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}>
                <MuiLink href="https://catmapper.org" aria-label="CatMapper home" sx={{ display: 'inline-flex' }}>
                  <Box
                    component="img"
                    src={withBasePath('/media/catmapper_small.webp')}
                    alt="CatMapper logo"
                    sx={{ display: 'block', height: '7vh', maxHeight: 56, width: 'auto' }}
                  />
                </MuiLink>
                <Typography variant="caption" sx={{ color: 'gray', fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                  CatMapper v{catmapperJsPackage.version}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  rowGap: 1,
                  columnGap: 1.5,
                  maxWidth: 760,
                }}
              >
                {footerLinks.map((link) => (
                  <MuiLink
                    key={link.url}
                    href={link.url}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      lineHeight: 1.2,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
