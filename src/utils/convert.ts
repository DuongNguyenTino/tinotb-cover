const countContact = (likeCount: String) => {
    let result: string
    const likeNumber = Number(likeCount)
    if (1000000 <= likeNumber) {
        let mil = Math.floor(likeNumber / 1000000)
        let ht = Math.floor((likeNumber - mil * 1000000) / 100000)
        result = mil + ',' + ht + 'Tr'
    } else if (1000 <= likeNumber) {
        let tho = Math.floor(likeNumber / 1000)
        let hun = Math.floor((likeNumber - tho * 1000) / 100)
        result = tho + ',' + hun + 'N'
    } else {
        result = likeNumber + ''
    }
    return result
}

const TimeoutVideo = (publicAtTime: any) => {
    const timeOut = Date.now() - Date.parse(publicAtTime)

    let years: any = Math.floor(timeOut / (24 * 3600 * 365 * 1000))
    let months: any = Math.floor(timeOut / (24 * 3600 * 30 * 1000))
    let days: any = Math.floor(timeOut / (24 * 3600 * 1000))
    let hours: any = Math.floor(timeOut / (3600 * 1000))
    let minutes: any = Math.floor(timeOut / (60 * 1000))

    if (years >= 1) {
        return years + ' năm'
    } else if (months >= 1) {
        return months + ' tháng'
    } else if (days >= 1) {
        return days + ' ngày'
    } else if (hours >= 1) {
        return hours + ' giờ'
    } else {
        return minutes + ' phút'
    }
}

const descriptionFc = (description: String) => {
    let des: any = description.split('\n')
    for (let i = 0; i < des.length; i++) {
        if (des[i].includes('http')) {
            let arr = des[i].split('http');
            des[i] = [arr[0], 'http' + arr[1]];
        } else {
            des[i] = [des[i]];
        }
    }

    return des
}

const convert = { countContact, TimeoutVideo, descriptionFc }

export default convert