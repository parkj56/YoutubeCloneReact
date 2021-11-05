import React from 'react';
import SearchBar from './SearchBar';

function TitleBar(props){
    return(
        <div className="row p-2 bg-secondary">
            <div className="col-md-12" style={{ padding: 0 }}>
                <div className="titleBar-nav">
                    <SearchBar searchResults={props.searchResults} />
                </div>
            </div>
        </div>
    )
}

export default TitleBar