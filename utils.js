

//export const findPointOnCircle

export const rotateXAxis = (pos, angle) => {

    console.log(pos);

    /*const matrix = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]*/
    const matrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]
    let result = [];
    console.log(matrix);
    console.log(pos.length);


    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum = sum + (matrix[i][j] * pos[j]);
        }
        result.push(sum);
    }


    /*
        [1 0 0]
        [0 cos𝜃 -sin𝜃]
        [0 sin𝜃 cos𝜃]

        *
        
        [pos.x]
        [pos.y]
        [pos.z]
    */
    return result;
}

export const rotateYAxis = (pos, angle) => {

    const matrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]
    /*
        [cos𝜃 0 sin𝜃]
        [0 1 0]
        [-sin𝜃 0 cos𝜃]

        *

        [pos.x]
        [pos.y]
        [pos.z]
    */
}

export const rotateZAxis = (pos, angle) => {
    /*
        [cos𝜃 sin𝜃 0]
        [−sin𝜃 cos𝜃 0]
        [0 0 1]  

        *
        
        [pos.x]
        [pos.y]
        [pos.z]
    */
}