import React from 'react';
import {ReactComponent as SearchIcon} from "../assets/magnifier.svg"
import {ReactComponent as TagIcon} from "../assets/tag.svg"
import {ReactComponent as GovLawIcon} from "../assets/govlaw.svg"
import {ReactComponent as DocTypeIcon} from "../assets/doc.svg"
import {ReactComponent as LanguageIcon} from "../assets/language.svg"
import {ReactComponent as ClassificationIcon} from "../assets/lock.svg"

import "./Tag.css"

const Tag = ({tagData,key,handleClick}) => {

	const renderTagIcon = (type) => {
		switch(type) {
			case "search":
				return <SearchIcon className='tagIcon' fill="white"/>
			case "gov-law":
				return <GovLawIcon className='tagIcon' fill="white"/>
			case "doc-type":
				return <DocTypeIcon className='tagIcon' fill="white"/>
			case "language":
				return <LanguageIcon className='tagIcon' fill="white"/>
			case "classification":
				return <ClassificationIcon className='tagIcon' fill="white"/>
			default:
				return <TagIcon className='tagIcon' fill="white"/>
		}
	}

	return ( 
		<button className="tag" key={key} onClick={handleClick} >
			{renderTagIcon(tagData.type)}
			{tagData.include === true ? <p>{tagData.name}</p> : <s>{tagData.name}</s>}
		</button>
	);
}
 
export default Tag;