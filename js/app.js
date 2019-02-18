(function (exports) {
	'use strict';
	// 要实现的功能
	// 1.单条添加todo
	// 2.单条删除todo
	// 3.双击编辑todo
	// 4.单条todo已完成样式状态改变
	// 5.全部已完成todo样式状态的改变
	// 6.清除全部已完成
	// 7.代办todo数量显示
	// 8.所有todo，已完成todo，待完成todo的过滤筛选
	// Your starting point. Enjoy the ride!
	exports.app=new Vue({
		el:".todoapp",
		data:{
			todoLists:[],
			dataStatus:["All","Active","Completed"],
			dataStatusIndex:0
		},
		created(){
			this.todoLists=JSON.parse(localStorage.getItem("list")) || []
		},
		computed: {
			// 7.代办todo数量显示
			times(){
				let times=0
				this.todoLists.map(item=>{
					if(!item.isChecked){
						times++
					}
				})
				return times
			}
		},
		methods:{
			// 1.单条添加todo
			addTodos(){
				if(this.$refs.currentInput.value=="") return
				this.todoLists=this.todoLists.concat({
					value:this.$refs.currentInput.value,
					isEditing:false,
					isChecked:false
				})
				localStorage.setItem("list",JSON.stringify(this.todoLists))
				this.$refs.currentInput.value=""
			},

			// 2.单条删除todo
			delTodo(index){
				this.todoLists.splice(index,1)
				localStorage.setItem("list",JSON.stringify(this.todoLists))
			},

			// 3.双击编辑todo && 单击单条todo已完成状态和样式的改变
			editTodos(obj){
				obj.isEditing=true
			},
			unEditTodos(obj){
				obj.isEditing=false
			},

			// 5.全部已完成todo样式状态的改变
			markAllCompleted(){
				this.todoLists.map(item=>{
					item.isChecked=!item.isChecked
					// item.isChecked=true
					localStorage.setItem("list",JSON.stringify(this.todoLists))
				})
			},
			// 6.清除全部已完成
			clearAllCompleted(){
				this.todoLists=this.todoLists.filter(item=>{
					return item.isChecked==false
				})
				localStorage.setItem("list",JSON.stringify(this.todoLists))
			},
			// 8.所有todo，已完成todo，待完成todo的过滤筛选
			filterTodos(index){
				this.todoLists=JSON.parse(localStorage.getItem("list"))
				this.dataStatusIndex=index
				if(this.dataStatus[index]=="All"){
					this.todoLists=this.todoLists
				}else if(this.dataStatus[index]=="Active"){
					this.todoLists=this.todoLists.filter(item=>{
						return item.isChecked==false
					})
				}else if(this.dataStatus[index]=="Completed"){
					this.todoLists=this.todoLists.filter(item=>{
						return item.isChecked==true
					})
				}
			},
			// 9.点击checkBox单条完成
			isCheckedTodo(index){
				this.todoLists=JSON.parse(localStorage.getItem("list"))
				this.todoLists[index].isChecked=!this.todoLists[index].isChecked
				localStorage.setItem("list",JSON.stringify(this.todoLists))
			}
		},
		directives: {
			"todo-focus": function(el,binding){
				if(binding.value){
					el.focus()
				}
			}
		} 
	})

})(window);
