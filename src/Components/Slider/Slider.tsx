import React, {useContext, useEffect} from 'react';
import SliderStore from '../../stores/SliderStore';
import Style from './Slider.module.scss';
import {observer} from "mobx-react";

function Slider() {

	const {sliderElements, prevSliderElement, selectSliderElement, nextSliderElement, setCanBeShown} = useContext(SliderStore);

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
		<div className={Style.slider}>
			<button onClick={() => {prevSliderElement(); changeCanBeShown()}}>{'<'}</button>

			<ul className={Style.slider_items}>
				{
					sliderElements.map(x => <li key={x.index} onClick={() => selectSliderElement(x.index)} className={`${Style.slider_item} ${x.selected ? Style.slider_item_active: ''}`}><div>{x.title}</div></li>)
				}
			</ul>

			<button onClick={() => {nextSliderElement(); changeCanBeShown()}}>{'>'}</button>
		</div>
	)

}

export default observer(Slider);