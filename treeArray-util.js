// 测试数据
let testData = [
    {
        id: '0',
        pid: 'super',
        name: 'superFather'
    },
    {
        id: '7ujm8ik9ol',
        pid: '4rfv5tgvyh',
        name: 'rrrrrrrr'
    },
    {
        id: '5tgyhujikd',
        pid: '2wsedcfvtg',
        name: 'yyyyyyy'
    },
    {
        id: 'iuytkkkku',
        pid: 'ewrtyuuuu',
        name: '9990000'
    },
    {
        id: '2wsedcfvtg',
        pid: '0',
        name: 'xxxxxx'
    },
    {
        id: '5tgb67hjjj',
        pid: '2wsedcfvtg',
        name: 'rrttttttt'
    },
    {
        id: '4rfv5tgvyh',
        pid: '2wsedcfvtg',
        name: 'tttttttt'
    },
    {
        id: '5tgyhdfghj',
        pid: '2wsedcfvtg',
        name: '6666666'
    },
    {
        id: 'ewrtyuuuu',
        pid: '0',
        name: 'uuuuuuu'
    },
];

/**
 * 获取树形结构型数组
 * @param {Array} array 原始数组
 * @param {string} pid  顶级节点id
 * @param {boolean} initFlag 初始化标志
 * @returns {Array} 树形结构的数组
 */
function getArrayOfTreeStruct(array, pid, initFlag) {
    let finalResult = [];
    let result = [];
    let temp = [];
    array.map(item => {
        // 获取顶级节点；初始化 finalResult 数组
        if (initFlag) {
            if (item.id === pid) {
                finalResult.push(item);
            }
        }
        // 判断是否有子节点
        if (item.pid === pid) {
            // 递归调用 判断是否有子节点
            temp = getArrayOfTreeStruct(array, item.id, false);
            // 若有子节点则将其存入该节点的children属性
            if (temp.length > 0) {
                item.children = temp;
            }
            // 将该节点存入 result
            result.push(item);
        }
    });
    //所有节点循环完毕后，将所有节点放入顶级节点下
    if (finalResult.length > 0 && result.length > 0) {
        finalResult[0].children = result;
    }
    return initFlag ? finalResult : result;
}

/**
 * 获取树形顺序型数组
 * @param {Array} array 原始数组
 * @param {string} pid  顶级节点id
 * @param {boolean} initFlag 初始化标志
 * @returns {Array} 树形顺序的数组
 */
function getArrayOfTreeOrder(array, pid, initFlag) {
    let finalResult = [];
    let temp = [];
    array.map(item => {
        // 获取顶级节点；初始化 finalResult 数组
        if (initFlag) {
            if (item.id === pid) {
                finalResult.push(item);
            }
        }
        // 判断是否有子节点
        if (item.pid === pid) {
            // 若有子节点，则先将该节点存入 finalResult 中
            finalResult.push(item);
            // 递归调用 判断是否有子节点
            temp = getArrayOfTreeOrder(array, item.id, false);
            // 若有子节点，则将该子节点合并入其父节点
            if (temp.length > 0) {
                // 合并数组（将子节点合并入其父节点）
                finalResult = finalResult.concat(temp);
            }
        }
    });
    return finalResult;
}
