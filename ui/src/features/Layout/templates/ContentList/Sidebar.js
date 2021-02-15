import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, setSearchTerm } from "app/ContentModule";
import Button from "features/Button";
import { getOptions } from "utils/http";

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[contentName]);
  const token = useSelector((state) => state.auth.token);
  const { searchTerm = '' } = state;
  const [relatedSearchTerms, setRelatedSearchTerms] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && token) {
        const options = getOptions(token);
        const searchTermLower = searchTerm.toLowerCase();
        const response = await fetch(
          `/api-search-suggestions?searchTerm_eq=${encodeURIComponent(searchTermLower)}`,
          options
        );
        setRelatedSearchTerms(await response.json());
      } else {
        setRelatedSearchTerms([]);
      }
    };
    fetchData();
  }, [searchTerm, token]);

  const handleClick = (text, event) => {
    dispatch(setSearchTerm(text));
  };
  
  return <>
           {relatedSearchTerms.length ? <div>
           See also
           <ul>
             {relatedSearchTerms.map((searchSuggestion) => {
               return searchSuggestion.suggestions.map((suggestion, i) => {
                 return <li key={i}>
                          {suggestion.url ?
                           <Button variant="link" to={suggestion.url}>{suggestion.text}</Button> :
                           <Button variant="link" onClick={(e) => handleClick(suggestion.text, e)}>{suggestion.text}</Button>
                          }
                        </li>
               });
             })}
           </ul>
           </div> : null}</>;
};


export default Sidebar;
