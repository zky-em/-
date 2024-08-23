// index.js

// 创建一个Group类
class Group {
  constructor(name, memberCount, members) {
    this.groupName = name;
    this.memberCount = memberCount; 
    this.members = members; 
  }

  setGroupName(name) {
    this.groupName = name;
  }

  setMemberCount(count) {
    this.memberCount = count;
  }

  addMember(name) {
    this.members.push(name);
  }
}

Page({
  data: {
    namesString: '',
    memberCounts: '',
    namesArray: [],
    countArray: [],
    groupnember:'',
    groupResult:''
  },

  handleInput (event) {
    console.log(event.detail.value);
    const value = event.detail.value;
    this.setData({
      namesString: value
    });
  },

  handleInput_2(event) {
    console.log(event.detail.value);
    const value = event.detail.value;
    this.setData({
      memberCounts: value
    });
  },

  onLoad() {
    // 根据输入框的内容长度设置输入框的高度
    const query = wx.createSelectorQuery();
    query.select('.textarea-container').boundingClientRect((res) => {
      const height = res.height; // 输入框容器的高度
      const lineHeight = 64; // 输入框每行的高度，根据实际情况调整
      const maxRows = Math.floor(height / lineHeight); // 最大显示行数
      const textareaHeight = maxRows * lineHeight; // 输入框的高度
      this.setData({
        textareaHeight
      });
    }).exec();
  },

  // 随机排序函数
  randomSort() {
    return 0.5 - Math.random();
  },

  splitNumber(namesnember, groupnember) {
    const result = [];
    const quotient = Math.floor(namesnember / groupnember); // 商
    const remainder = namesnember % groupnember; // 余数
    //console.log(quotient);
    //console.log(remainder);
  
    // 将商均分到数组中
    for (let i = 0; i < groupnember; i++) {
      result.push(quotient);
    }
  
    // 将余数平均分配给数组中的元素
    for (let i = 0; i < remainder; i++) {
      result[i] += 1;
    }
    //console.log(result);
    return result;
    
  },
  
  groupStudents() {
    // 使用换行符拆分字符串为数组
    const namesArray = this.data.namesString.split('\n');
    const namesnember = namesArray.length;
    // 使用换行符拆分字符串为数组
    var countArray = this.data.memberCounts.split('\n');
    //console.log(countArray)
    const countArrayl = countArray.length;

    if (namesnember < countArrayl) {
      this.setData({
        groupResult: '人数不足'
      });
      return;
    }

    if (countArrayl == 1){
      const groupnember = parseInt(countArray);
      //console.log(groupnember)
      countArray = this.splitNumber(namesnember, groupnember);
      console.log(countArray)
      this.setData({
        countArray: countArray
      });
    }
    

    // 使用随机排序函数对数组进行随机排序
    namesArray.sort(this.randomSort); // 引用的随机排序函数

    // 创建一个空数组来存储Group对象
    const groups = [];

    console.log(countArray)

    // 循环创建多个Group对象
    for (let i = 0, j = 0; i < countArray.length; i++) {
      const name = 'Group ' + (i + 1); // 名称计算逻辑
      const memberCount = parseInt(countArray[i]); // 将字符串转换为整数
      const members = namesArray.slice(j, j + memberCount); 

      j += memberCount;

      const group = new Group(name, memberCount, members);
      //console.log(group);
      groups.push(group);
    }

    // 将分组结果保存到 groupResult 变量中
    var groupResult = JSON.stringify(groups);
    this.setData({
      groupResult: groupResult
    });
  
    
  }
});
