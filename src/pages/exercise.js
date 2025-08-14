import React from 'react'; 
function Exercise(props){ 
  const names = props.names; 
  const ListItems = names.map((personName, index) => 
  <li key={index}>Hello, {personName}</li>); 
  return <ul>{ListItems}</ul>; 
} 
export default Exercise;