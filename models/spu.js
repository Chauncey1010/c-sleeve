




class Spu {
    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }
}

export {
    Spu
}