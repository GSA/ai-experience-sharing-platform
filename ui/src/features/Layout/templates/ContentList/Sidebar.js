import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, setSearchTerm } from "app/ContentModule";
import Button from "features/Button";

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[contentName]);
  const token = useSelector((state) => state.auth.token);
  const { list: { searchTerm } = {} } = state;
  const [relatedSearchTerms, setRelatedSearchTerms] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && token) {
        const response = await fetch(
          `/api-search-suggestions?searchTerm_eq=${encodeURIComponent(searchTerm)}`,
          {
            credentials: 'include',
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
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
                          <Button variant="link" onClick={(e) => handleClick(suggestion.text, e)}>{suggestion.text}</Button>
                        </li>
               });
             })}
           </ul>
           </div> : null}</>;
};


export default Sidebar;
