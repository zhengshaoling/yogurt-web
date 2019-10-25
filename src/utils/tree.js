// 菜单对应
export function treeData(jsonData) {
  return treeDatax(jsonData, 0);
}

// 菜单对应
export function treeDatax(jsonData, rootPid) {
  var resultObj = [];
  function tree(jsonData) {
    // 取得顶级的数据
    var baseNode = jsonData.filter(function (element) {
      return element.pid === rootPid;
    });
    resultObj.push(...baseNode);
    getChildren(resultObj, jsonData);
  }

  // 递归取得顶层节点的子节点
  function getChildren(nodeList, jsonData) {
    nodeList.forEach(function (elemet, index) {
      elemet.children = jsonData.filter(function (item, indexI) {
        return item.pid === elemet.id;
      });
      if (elemet.children.length > 0) {
        getChildren(elemet.children, jsonData);
      }
    });
  }
  tree(jsonData);
  return resultObj;
}

// 子类值，不传children
export function treeList(jsonData) {
  var resultObj = [];
  function tree(jsonData) {
    // 取得顶级的数据
    var baseNode = jsonData.filter(function (element) {
      return element.pid === 0;
    });
    resultObj.push(...baseNode);
    getChildren(resultObj, jsonData);
  }

  // 递归取得顶层节点的子节点
  function getChildren(nodeList, jsonData) {
    var children = []
    nodeList.forEach(function (elemet, index) {
      children = jsonData.filter(function (item, indexI) {
        return item.pid === elemet.id;
      });
      // 子类值，不传children
      if (children.length>0){
        elemet.children=children;
        if (elemet.children.length > 0) {
          getChildren(elemet.children, jsonData);
        }
      }
    });
  }

  tree(jsonData);
  return resultObj;
}

// 删除空白delChildren对象
export function delChildren(item, otherVal){
  item.map(citem => {
    if (citem.children.length === 0 || (otherVal && citem.id===otherVal)) {
      delete citem.children
    } else {
      delChildren(citem.children)
    }
  })
  return item
}

