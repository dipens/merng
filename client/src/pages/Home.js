import React from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard'
function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    console.log(useQuery(FETCH_POSTS_QUERY))
    
    if(!loading)
    {
        const posts = data.getPosts;
        return (
            <Grid columns={3}>
                <Grid.Row className="page-title">
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (<h1>Loading posts...</h1>) : (
                        posts && posts.map(post => (
                            <Grid.Column key={post.id}  style={{marginBottom: 20}}>
                                <PostCard post={post}></PostCard>
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid>
        )
    }
    else {
        return (<h1>Loading posts...</h1>);
    }
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;

export default Home;