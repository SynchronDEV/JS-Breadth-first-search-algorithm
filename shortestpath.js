function setNeighbours(from, to) {
  const neighbours = {};
  from.forEach((element, key) => {
    if (neighbours[element]) {
      neighbours[element].push(to[key])
    } else {
      neighbours[element] = [to[key]];
    }
  });
  to.forEach((element, key) => {
    if (neighbours[element]) {
      neighbours[element].push(from[key])
    } else {
      neighbours[element] = [from[key]];
    }
  });
  return neighbours;
}

function fastestRoute(from, to, locationA, locationB) {
  const allNeighbours = setNeighbours(from, to);
  const n = Object.keys(allNeighbours).length; //in order to get the length of a dictionary you need to use the Object.keys() method


  const q = [locationA];
  const visitedNeighbours = new Array(n).fill(false); //Used later in the for-loop if-statement to track which nodes have already been visited in order to prevent a search loop
  const prv = new Array(n).fill(-1);

  while (q.length > 0) {
    const cur = q.shift();
    for (var i = 0; i < allNeighbours[cur].length; ++i) {
      const v = allNeighbours[cur][i];

      if (!visitedNeighbours[v]) {
        visitedNeighbours[v] = true;
        prv[v] = cur;
        q.push(v);
      }
    }
  }

  if (prv[locationB] == -1) {
    console.log('No path available')
    return -1;
  }

  var cur = locationB;
  const path = [];
  while (cur != locationA) {
    path.push(cur);
    cur = prv[cur];
  }
  path.push(locationA);
  path.reverse();
  const cost = path.length - 1;
  console.log(cost);
  return cost;
}

fastestRoute([0, 0, 1], [1, 2, 3], 2,3)