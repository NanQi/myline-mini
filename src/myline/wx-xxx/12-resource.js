class RepositoryBase {

    constructor(resource) {
        this.resource = resource
    }

    getList(query) {
        return wx.api.get(this.resource, query)
    }

    getItem(id) {
        const url = this.resource + '/' + id
		return wx.api.get(url)
    }

    add(newItem) {
        return wx.api.post(this.resource, newItem, true)
    }

    save(id, data) {
        const url = this.resource + '/' + id
		return wx.api.post(url, data, true, 'PUT')
    }

    remove(id) {
        const url = this.resource + '/' + id
		return wx.api.post(url, {}, true, 'DELETE')
    }
} 

wx.resource = (resource) => {
    return new RepositoryBase(resource)
}