import Grid from '../components/Grid';

const generateMaze = (maze, squareRefs, resetGrid) => {
  resetGrid(false);
  let delay = 20;
  switch (maze) {
    case 'random':
      randomMaze(squareRefs, delay);
      break;
    case 'dfs':
      dfs(squareRefs, delay);
      break;
    default:
  }
};

const randomMaze = (squareRefs, delay) => {
  squareRefs.forEach((ref, index) => {
    const elm = ref.current;
    if (
      index !== Grid.INITIAL_START &&
      index !== Grid.INITIAL_END &&
      Math.random() < 0.3
    ) {
      elm.className = Grid.WALL_SQ;
    }
  });
};

const dfs = (squareRefs, delay) => {
  let tick = 1;
  const start = 0;
  const visited = new Set([start]);
  squareRefs.forEach((ref) => (ref.current.className = Grid.WALL_SQ));
  changeSquare(squareRefs, start, Grid.START_SQ, tick++ * delay);
  const path = [start];
  // let currSquare = start;
  while (path.length > 0) {
    const currSquare = path.pop();
    let moves = [-2, 2, -2 * Grid.WIDTH, 2 * Grid.WIDTH];
    moves = moves.filter((move) =>
      Grid.validMove(currSquare, currSquare + move)
    );

    while (moves.length > 0) {
      const nextMove =
        currSquare + moves.splice(Math.random() * moves.length, 1)[0];
      const nextMoves = [(currSquare + nextMove) / 2, nextMove];
      if (!visited.has(nextMove)) {
        changeSquare(squareRefs, nextMoves[0], Grid.DEFAULT_SQ, tick++ * delay);
        changeSquare(squareRefs, nextMoves[1], Grid.DEFAULT_SQ, tick++ * delay);
        visited.add(nextMove);
        path.push(nextMove);
        break;
      }
    }
  }

  // place end as far away as possible from start
  const end = squareRefs.reduce(
    (max, sq, ind) =>
      Grid.dist(start, ind) < Grid.dist(start, max) ? ind : max,
    0
  );
  changeSquare(squareRefs, start, Grid.START_SQ, tick++ * delay);
  changeSquare(squareRefs, end, Grid.END_SQ, tick++ * delay);
};

const changeSquare = (squareRefs, square, squareType, delay) => {
  setTimeout(() => (squareRefs[square].current.className = squareType), delay);
};

export default { generateMaze };
