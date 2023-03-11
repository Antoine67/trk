type Rectangle = {x: number, y: number, width: number, height: number}

const rectangles : Rectangle[]  = [
    {x: 1, y: 2, width: 1, height: 1}, //A
    {x: 2, y: 2, width: 1, height: 1}, //B

    {x: 2, y: 4, width: 1, height: 1}, //C
    {x: 3, y: 4, width: 2, height: 1}, //D
    {x: 5, y: 4, width: 1, height: 1}, //E
    {x: 3, y: 5, width: 1, height: 1}, //F

    {x: 5, y: 8, width: 1, height: 1}, //G
    {x: 6, y: 6, width: 1, height: 3}, //H
    {x: 6, y: 6, width: 1, height: 1}, //I
]



console.log(groupRectangles(rectangles))

function groupRectangles(rectangles: Rectangle[]): Rectangle[][] {
    const groups: Rectangle[][] = [];
    for (const rect of rectangles) {
        let foundGroup = false;
        for (const group of groups) {
            if (group.some(groupRect => areRectanglesTouching(groupRect, rect) || areRectanglesAdjacent(groupRect, rect)) ) {
                group.push(rect);
                foundGroup = true;
                break;
            }
        }
        if (!foundGroup) {
            groups.push([rect]);
        }
    }
    return groups;
}


function areRectanglesAdjacent(rect1: Rectangle, rect2: Rectangle): boolean {
    const isLeft = rect1.x + rect1.width === rect2.x && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
    const isRight = rect1.x === rect2.x + rect2.width && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
    const isTop = rect1.y + rect1.height === rect2.y && rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x;
    const isBottom = rect1.y === rect2.y + rect2.height && rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x;
    return isLeft || isRight || isTop || isBottom;
}

function areRectanglesTouching(rect1: Rectangle, rect2: Rectangle): boolean {
    const touchingOnX = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const touchingOnY = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    return touchingOnX && touchingOnY;
}
