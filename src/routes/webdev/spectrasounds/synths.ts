import ptable from "$lib/atomicspectra/elements.json";
import type { SpectraLine, Element } from "$lib/atomicspectra/types/native";
import { browser } from "$app/environment";
import { assertExists } from "$lib/uniqueid";

// https://www.desmos.com/calculator/oideopwllh

const LOG2_20 = Math.log2(20);
const MIN_VIS_FQ = 1 / 750; // violet
const MAX_VIS_FQ = 1 / 380; // red

function audibleMap( wl: number ){

    const fq   = 1 / wl;
    const map  = ( fq - MIN_VIS_FQ ) / ( MIN_VIS_FQ - MAX_VIS_FQ );
    const midi = 115 * map / 12 + LOG2_20
    return Math.pow(2, midi);

}

// Have to do this stupid crap so SSR doesn't witness the GainNode, otherwise it breaks
export function load() {

    class OscillatorWithGainNode extends GainNode {
        private _osc: OscillatorNode;
    
        constructor(context: AudioContext, frequency: number, gain: number) {
            super(context, { gain: gain });
            this._osc = new OscillatorNode(context, { frequency: frequency, type: "sine" });
            this._osc.connect(this);
        }
    
        public start() {
            this._osc.start();
        }
    
        public stop(when?: number) {
            this._osc.stop(when);
        }
    }

    class AtomicSpectraNode extends GainNode {

        private _oscs: OscillatorWithGainNode[] = [];
        private _amp:  GainNode;

        constructor(context: AudioContext, atom: Element) {
            super(context);
            const lines = atom.spectra
            this._amp = new GainNode(context, { gain: 1000 / lines.reduce( (acc, line) => acc + line.a, 0 ) });
            for( let line of lines ){
                const osc = new OscillatorWithGainNode(context, audibleMap(line.wl), line.a * 0.001);
                osc.connect(this._amp);
                this._oscs.push(osc);
            }
            this._amp.connect(this);
        }

        public start(){
            for( let osc of this._oscs ){
                osc.start();
            }
        }

        public stop(when?: number){
            const t = (when || this.context.currentTime);
            for( let osc of this._oscs ){
                osc.stop(t);
            }
        }

    }

    return {
        OscillatorWithGainNode: OscillatorWithGainNode,
        AtomicSpectraNode:      AtomicSpectraNode,
    }
}
