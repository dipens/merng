import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';

import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import Postform from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/graphql';
function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);    
    if(!loading)
    {
        const posts = data.getPosts;
        return (
            <Grid columns={3}>
                <Grid.Row className="page-title">
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <Postform></Postform>
                        </Grid.Column>
                    )}
                    {loading ? (<h1>Loading posts...</h1>) : (
                        <Transition.Group>
                            {posts && posts.map(post => (
                            <Grid.Column key={post.id}  style={{marginBottom: 20}}>
                                <PostCard post={post}></PostCard>
                            </Grid.Column>
                        ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        )
    }
    else {
        return (<h1>Loading posts...</h1>);
    }
}



export default Home;