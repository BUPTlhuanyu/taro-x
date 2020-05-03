/**
 * 微信小程序
 */
export const compressImagePromise = (url) => {
    return new Promise((resolve, reject) => wx.compressImage({
        src:url,
        success:function(res){
            resolve(res)
        },
        fail:function(res){
            reject(res)
        }
    }))
}

export const readFilePromise = (options) => {
    return new Promise((resolve, reject) => wx.getFileSystemManager().readFile({
        ...options,
        success:function(res){
            resolve(res)
        },
        fail:function(res){
            reject(res)
        }
    }))
}


export async function uploader(url, postFn) {
    let compressed:any = await compressImagePromise(url)
    let base64:any = await readFilePromise({
        filePath: compressed.tempFilePath,
        encoding: 'base64'
    })
    return postFn(base64.data)
}


/**
 * 微信公众号SDK
 */
export const uploadImagePromise = (options) => {
    return new Promise((resolve, reject) => wx.uploadImage({
        ...options,
        success:function(res){
            resolve(res)
        },
        fail:function(res){
            reject(res)
        }
    }))
}