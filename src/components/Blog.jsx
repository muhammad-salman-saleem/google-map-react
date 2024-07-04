import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();
    const scrollTriggerRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setFetching(true);
                const domains="cnn.com,bbc.com";
                const language="en";
                const response = await fetch(`https://newsapi.org/v2/everything?domains=${domains}&language=${language}&apiKey=f6dce1168bd845a1bad35ab026d13c94&page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const postsData = await response.json();
                setPosts(prevPosts => [...prevPosts, ...postsData.articles]);
                setLoader(false);
                setFetching(false);
                if (postsData.articles.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                setError(error.message);
                setLoader(false);
                setFetching(false);
            }
        };

        fetchPosts();
    }, [page]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };

        const handleObserver = (entities) => {
            const target = entities[0];
            if (target.isIntersecting && hasMore && !fetching) {
                setPage(prevPage => prevPage + 1);
            }
        };

        observer.current = new IntersectionObserver(handleObserver, options);
        if (loader) return;
        if (hasMore) {
            observer.current.observe(scrollTriggerRef.current);
        }
        
        return () => {
            observer.current.disconnect();
        };
    }, [hasMore, fetching, loader]);

    if (loader && page === 1) {
        return <Box sx={{display:"flex",width:"100%",height:"100vh",alignItems:"center",justifyContent:"center"}}>
           <CircularProgress color="success" />
        </Box>;
    }

    if (error) {
        return <Box sx={{display:"flex",width:"100%",height:"100vh",alignItems:"center",justifyContent:"center"}}><Typography>Error: {error}</Typography></Box>;
    }

    return (
        <>
            <Typography variant='h2'>Posts</Typography>
            <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",width:"100%"}}>
                {posts.map((post, index) => (
                    <Card sx={{ maxWidth: 345,mt:"10px" }} key={index}>
                        <CardActionArea component={Link} to={post.url} target='_blank'>
                            <CardMedia
                                component="img"
                                height="200"
                                image={post?.urlToImage}
                                alt={post?.source.name}
                                loading="lazy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <Box ref={scrollTriggerRef}  sx={{display:"flex",width:"95%",alignSelf:"center",height:"50px",alignItems:"center",justifyContent:"center",mx:2}}>
                <CircularProgress color="success" />
                </Box>
            {fetching && <Box sx={{display:"flex",width:"95%",alignSelf:"center",height:"40px",alignItems:"center",justifyContent:"center"}}>
                <CircularProgress color="success" />
                </Box>}
            {!hasMore && <Typography variant="body2" sx={{ textAlign: 'center' }}>End of content</Typography>}
        </>
    );
};

export default Blog;
