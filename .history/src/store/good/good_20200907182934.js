import api from "../../http/api"
import router from "../../router"
import dayjs from "dayjs"
import {
    Message
} from "element-ui"
export default {
    namespaced: true,
    //存储共享数据
    state: {
        goodList: [],
        total: 0,
        orieslist: [],
        parameter: [], //参数列表
        goodkind: [], //商品分类
        kindTotal: 0
    },
    //同步修改state的值
    mutations: {
        setGoodList(state, data) {
            state.goodList = data
        },
        settotal(state, data) {
            state.total = data
        },
        setories(state, data) {
            state.orieslist = data
        },
        setcategories(state, data) {
            state.parameter = data
        },
        setGoodkind(state, data) {
            state.goodkind = data
        },
        setkindtotal(state, data) {
            state.kindTotal = data
        }
    },

    actions: {
        //全部数据
        async getGoods({
            commit
        }, {
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.getGoods(query, pagenum, pagesize)
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')
                })
                console.log(res.data.goods)
                commit("settotal", res.data.total)
                commit("setGoodList", res.data.goods)

            }
        },
        async editorGoods({
            commit
        }, {
            id,
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        }) {
            let res = await api.editorGoods(id,
                goods_name,
                goods_price,
                goods_number,
                goods_weight,
                goods_introduce,
                pics,
                attrs)
            if (res.meta.status === 200) {
                console.log(res);
                console.log(commit);
                Message.success(res.meta.msg)
            } else {
                console.log(res);
                Message.error(res.meta.msg)
            }


        },
        async delGoods({
            dispatch,

        }, {
            id,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.delGoods(id)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getGoods', {
                    query,
                    pagenum,
                    pagesize,
                })
            }
        },
        //层级选择器全部数据
        async categories({
            commit
        }, {
            type,
            pagenum,
            pagesize
        }) {
            let res = await api.categories(type, pagenum, pagesize)
            if (res.meta.status === 200) {
                console.log(res, "层级选择器全部数据");
                res.data.map(item => {
                    item.value = item.cat_id
                    item.label = item.cat_name
                    if (item.children && item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.label = item1.cat_name
                            item1.value = item1.cat_id
                            if (item1.children && item.children.length > 0) {
                                item1.children.map(item2 => {
                                    item2.label = item2.cat_name
                                    item2.value = item2.cat_id
                                })
                            }
                        })
                    }
                })
                console.log(res.data);
                commit("setories", res.data)
            }
        },
        //（层级选择器选择后）动态参数数据
        async getcategories({
            commit
        }, {
            id,
            sel
        }) {
            let res = await api.getcategories(id, sel)
            if (res.meta.status === 200) {
                res.data.map(item => {
                    item.attr_vals = item.attr_vals.split(',')
                })
                console.log(res.data);
                commit("setcategories", res.data)
            }
        },
        async addgoods({
            commit
        }, {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        }) {
            let res = await api.addgoods({
                goods_name,
                goods_cat,
                goods_price,
                goods_number,
                goods_weight,
                goods_introduce,
                pics,
                attrs
            })
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
                console.log(commit);
                router.push("/goods/goods");
            } else {
                Message.error(res.meta.msg)
            }

        },
        //编辑提交修改参数
        async putcategories({
            dispatch
        }, {
            id,
            attrId,
            attr_name,
            attr_sel,
            attr_vals,
        }) {
            let res = await api.putcategories(id, attrId, attr_name, attr_sel, attr_vals)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                console.log(dispatch)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除参数
        async delcategories({
            commit
        }, {
            id,
            attrid
        }) {
            let res = await api.delcategories(id, attrid)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                console.log(commit);
            } else {
                Message.error(res.meta.msg)
            }
        },
        async postcategories({
            commit
        }, {
            id,
            attr_name,
            attr_sel,
            attr_vals
        }) {
            let res = await api.postcategories({
                id,
                attr_name,
                attr_sel,
                attr_vals
            })
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
                console.log(commit);
            }
        },
        //商品分类数据列表
        async getCategories({
            commit
        }, {
            type,
            pagenum,
            pagesize
        }) {
            let res = await api.getCategories(type, pagenum, pagesize)
            if (res.meta.status === 200) {
                res.data.result.map(item => {
                    item.level = "一级"
                    item.type = "success"
                    if (item.children && item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.level = "二级"
                            item1.type = "info"
                            if (item1.children && item1.children.length > 0) {
                                item1.children.map(item2 => {
                                    item2.level = "三级"
                                    item2.type = "danger"
                                })
                            }
                        })
                    }
                })
                commit("setGoodkind", res.data.result)
                commit("setkindtotal", res.data.total)
            }
        },
        //编辑提交分类
        async putCategories({
            dispatch
        }, {
            id,
            cat_name,
            type,
            pagenum,
            pagesize
        }) {
            let res = await api.putCategories(id, cat_name)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getCategories', {
                    type,
                    pagenum,
                    pagesize
                })
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除分类
        async delCategories({
            dispatch
        }, {
            id,
            type,
            pagenum,
            pagesize
        }) {
            let res = await api.delCategories(id)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getCategories', {
                    type,
                    pagenum,
                    pagesize,
                    type,
                    pagenum,
                    pagesize
                })
            } else {
                Message.error(res.meta.msg)
            }
        },
        async postcategories({
            dispatch
        }, {
            cat_pid,
            cat_name,
            cat_level
        }) {
            let res = await api.delCategories({
                cat_pid,
                cat_name,
                cat_level
            })
            if (res.meta.status === 201) {
                console.log(res);
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
    }