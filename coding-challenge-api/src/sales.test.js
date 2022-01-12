import {getSales} from './sales'

const request = {
	body: {},
	params: {},
    query:{}
};

const response = {
	responseStatus: 0,
	body: null,
	status: function(rstatus) {
		// eslint-disable-next-line no-invalid-this
		this.responseStatus= rstatus;
		return this;
	},
	json: function(json) {
		this.body= json;
		return this;
	},
};


describe('sales api tests',()=>{
    request.query={'status':'Pending'}
    it("getSales returns with status 200", async(done) => {
        await getSales(request,response);
        expect(response.responseStatus).toBe(200);
        return done();
    })

    it("getSales returns with sales array", async(done) => {
        await getSales(request,response);
        expect(response.body.result.length).toBe(16);
        return done();
    
})
});

