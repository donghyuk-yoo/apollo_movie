import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro
            isLiked @client
          }
          suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 150vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: block;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px; 
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 50vh;
    height: 50vh;
    padding-top: 300px;
    margin-left: 50px;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

export default () => {
    // get parameter
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });

    return (
        <Container>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
            <Column>
                <Title>
                    {loading 
                    ? "Loading..."
                    : `${data.movie?.title} ${data.movie?.isLiked ? "- like" : "- unlike"}`}
                </Title>
                <Subtitle>
                    {data?.movie?.language} · {data?.movie?.rating}
                </Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
            </Column>
        </Container>
    );
};