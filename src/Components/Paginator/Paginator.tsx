import React, {useContext, useEffect} from 'react';
import PaginatorStore from '../../stores/PaginatorStore';
import Style from './Paginator.module.scss';
import {observer} from "mobx-react";

function Paginator() {

	const {paginatorElements, prevPaginatorElement, selectPaginatorElement, nextPaginatorElement, setCanBeShown} = useContext(PaginatorStore);

	const changeCanBeShown = () => {
		let ulWidth = document.getElementsByTagName('ul')[0].offsetWidth;
		let lisWitdh = Array.from(document.getElementsByTagName('li')).map(x => x.offsetWidth);
		let diff = ulWidth - (lisWitdh.reduce((a, b) => a + b, 0) + (lisWitdh.length + 1) * 16);
		setCanBeShown(Math.floor(diff / 100));
	};

	useEffect(() => {
		changeCanBeShown();
	}, []);

	window.onresize = () => changeCanBeShown();

	return (
		<div className={Style.paginator}>
			<button onClick={() => {prevPaginatorElement(); changeCanBeShown()}}>{'<'}</button>

			<ul className={Style.paginator_items}>
				{
					paginatorElements.map(x => <li key={x.index} onClick={() => selectPaginatorElement(x.index)} className={`${Style.paginator_item} ${x.selected ? Style.paginator_item_active: ''}`}><div>{x.title}</div></li>)
				}
			</ul>

			<button onClick={() => {nextPaginatorElement(); changeCanBeShown()}}>{'>'}</button>
		</div>
	)

}

export default observer(Paginator);