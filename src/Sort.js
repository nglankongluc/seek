import React from 'react';

let sortBy = null;

const compare = (a, b) => {
    // you can access the relevant property like this a.props[by]
    // depending whether you are sorting by tilte or year, you can write a compare function here, 

    if(sortBy === "date"){
        let a_date = Date.parse(a.props[sortBy]);
        let b_date = Date.parse(b.props[sortBy]);

        console.log(a.props["index"]);
        console.log(b.props["index"]);
        console.log(a_date);
        console.log(b_date);

        if (a_date > b_date) {
            return a;
        }else{
            return b;
        }
    }
    
    return b;
}

const Sort = ({children, by}) => {
    sortBy = by;
    if(!by) {
        // If no 'sort by property' provided, return original list
        return children
    }
    return React.Children.toArray(children).sort(compare);
}

export default Sort;