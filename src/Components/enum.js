
export const DISPLAY = {
    "wireframe": 0,
    "floor": 1,
    "axis": 2,
    "navigate": 3,
}
Object.freeze(DISPLAY); //要當作 enum 使用的，所以用 freeze，不允許之後去進行更改

export const DIMENSION = {
    "X": 0,
    "Y": 1,
    "Z": 2,
    "NUM_DIM": 3,
}
Object.freeze(DIMENSION);