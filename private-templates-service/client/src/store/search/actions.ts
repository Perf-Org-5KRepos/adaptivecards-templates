import {
  QUERY_SEARCH_BEGIN,
  QUERY_SEARCH_SUCCESS,
  QUERY_SEARCH_FAILURE,
  SearchAction,
  CLEAR_SEARCH } from './types';

import { IncomingMessage } from 'http';
import { TemplateApi } from 'adaptive-templating-service-typescript-node';

export function querySearchBegin(): SearchAction{
  return{
    type: QUERY_SEARCH_BEGIN,
    text: 'User has pressed enter to Search, Search Query has begin',
    searchValue: ""
  }
}

export function querySearchSuccess(cards: any, searchValue: string): SearchAction{
  return{
    type: QUERY_SEARCH_SUCCESS,
    text: "User Query was successful",
    cards: cards,
    searchValue: searchValue
  }
}

export function querySearchFailure(error: IncomingMessage): SearchAction {
  return{
    type: QUERY_SEARCH_FAILURE,
    text: "User Query was not successful",
    searchValue: "",
    error: error
  }
}

export function querySearch(searchValue: string){
  return function(dispatch: any){
    dispatch(querySearchBegin())
    let api = new TemplateApi()
    // TODO: dynamiclly fetch bearer token
    console.log("search Value inside querySearch:" + searchValue);
    api.setApiKey(0,"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiI0ODAzZjY2YS0xMzZkLTQxNTUtYTUxZS02ZDk4NDAwZDU1MDYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3L3YyLjAiLCJpYXQiOjE1ODE0NzAxMDYsIm5iZiI6MTU4MTQ3MDEwNiwiZXhwIjoxNTgxNDc0MDA2LCJhaW8iOiI0Mk5nWUtqNDUzd3dLdjFQbTE3KysyMEsxNnd1QVFBPSIsImF6cCI6IjQ4MDNmNjZhLTEzNmQtNDE1NS1hNTFlLTZkOTg0MDBkNTUwNiIsImF6cGFjciI6IjEiLCJvaWQiOiI4Yzg1ZjgwNi03MDA1LTRlY2QtOGYxZS1kMWY3ODRmNThiOWMiLCJzdWIiOiI4Yzg1ZjgwNi03MDA1LTRlY2QtOGYxZS1kMWY3ODRmNThiOWMiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJxcjRDdVI4LUlFdWZ4eUE0Q3VZZkFBIiwidmVyIjoiMi4wIn0.MsCIvnouCP30Oto72KaFKfew7kA5bfvkrs1P9RJhw_qYFPNFR4cJ-m3q4oEVc0Iy0fjml6qiUatPF6cQJW-dy8gghtZaUaju_oDd4kCpeRZEZt2JO9ew_n0F3o8Qfsd8QrlkVPxmCL6iL0ih3jSYHqzvvf7eMR4RyfwkX_o-j5jZkOCfTqDt2lh27LrLDPiyfQIwvALiHoX7xDTe7R6-1JRfrqa6MgHchtkeJex0pDdU8LXDUVJlR1KY62tdl7vNxY8z9KoZrSV4Kv1wZpMwCi5tfHt6cfYU5-8pHVbrydyzdfPqAnWgUtgcBDCR2i3Dg-z_L0RE8Ao6sPrr742KRA");
    return api.templateGet(undefined, searchValue)
      .then(response => {
        if (response.response && response.response.statusCode === 200) {
            console.log(response);
            dispatch(querySearchSuccess(response.body,searchValue))
        }
        else{
          dispatch(querySearchFailure(response.response))
        }
      })
  }
}

export function clearSearch(): SearchAction{
  return{
    type: CLEAR_SEARCH,
    text: 'User has pressed esc or pressed the "X" to clear the search',
    searchValue: ""

  }
}
