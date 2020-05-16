





class FenceGroup {
    spu
    skuList = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = - 1
        matrix.forEach((element, i, j) => {
            if (currentJ !== j) {
                currentJ = j
                this._createMatrix(element)
            }
        })
    }

    _createFence(element) {
        const fence = new Fence()
        fence.pushValueTitle(Element.value)
        return fence
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}

export {
    FenceGroup
}