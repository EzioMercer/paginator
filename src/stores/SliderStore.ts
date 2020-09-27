import {action, observable} from "mobx";
import {createContext} from "react";

class SliderELement {
    title: string = '';
    selected: boolean = false;
    index: number = 0;
}

function makeid(length: number): string {
    let result: string= '';
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    while (length--) result += characters[(Math.round(Math.random() * characters.length))];

    return result;
}

class SliderStore {

    prev: number = 0;
    curr: number = 0;
    left: number = 0;
    right: number = 0;
    canBeShown: number;

    arr: SliderELement[] = (new Array(16).fill(null)).map((x, i) => ({selected: false, title: makeid(Math.round(Math.random() * 6) + 2), index: i}));

    constructor() {
        this.canBeShown = 0;
        this.left = 0;
        this.right = this.left + this.canBeShown;
        this.arr[0].selected = true;
    }

    @observable sliderElements: SliderELement[] = this.arr.filter((x, i) => x.index < this.right);

    updateSliderElements = () => {
        this.sliderElements = this.arr.filter(x => x.index < this.right && x.index >= this.left);
    };

    @action setCanBeShown = (change: number) => {

        this.canBeShown += change;
        this.canBeShown = this.canBeShown <= 0 ? 1 : this.canBeShown > this.arr.length ? this.arr.length : this.canBeShown;

        if (change > 0) {
            while (change--) {
                if (this.right < this.arr.length) this.right++;
                else if (this.left > 0) this.left--;
            }
        } else {
            while (change++) {
                if (this.right > this.prev + 1) this.right--;
                else if (this.left < this.prev) this.left++;
            }
        }

        this.updateSliderElements();
    };

    @action prevSliderElement = () => {
        let buf = this.prev - 1;
        this.curr = (this.prev + this.arr.length - 1) % this.arr.length;

        this.arr[this.prev].selected = false;
        this.arr[this.curr].selected = true;
        this.prev = this.curr;

        if (buf <= this.left && buf >= 0) {
            this.left = buf;
            this.right = this.left + this.canBeShown;
        }

        if (buf === -1) {
            this.right = this.arr.length;
            this.left = this.right - this.canBeShown;
        }

        this.updateSliderElements();
    };

    @action selectSliderElement = (curr: number) => {
        this.arr[this.prev].selected = false;
        this.arr[curr].selected = true;
        this.prev = curr;
        this.updateSliderElements();
    };

    @action nextSliderElement = () => {
        let buf = this.prev + 1;
        this.curr = (this.prev + 1) % this.arr.length;

        this.arr[this.prev].selected = false;
        this.arr[this.curr].selected = true;
        this.prev = this.curr;

        if (buf === this.right && buf < this.arr.length) {
            this.right = buf + 1;
            this.left = this.right - this.canBeShown;
        }

        if (buf === this.arr.length) {
            this.right = this.canBeShown;
            this.left = 0;
        }

        this.updateSliderElements();
    };

}

export default createContext(new SliderStore());