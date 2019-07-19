const app = require('../src/app');

describe('GET /bookmarks endpoint',()=>{
  it('response with a 200 code',()=>{
    return request(app).get('/bookmarks').expect(200);
  });
  it('returns all bookmarks',()=>{
    return request(app)
      .get('/bookmarks')
      .expect(200)
      .expect((res)=>{
        expect(res.body).to.be.an('array');
        expect(res.body.length > 0);
      });
  });
  it('bookmarks/:id returns a single book',()=>{
    return request(app)
      .get('/bookmarks/:id')//is this how to do this?
      .expect(200)
      .expect((res)=>{
        expect(res.body).to.be.an('array');
        expect(res.body.length === 1);
        expect(res.body).to.eql({todo:'somevalue'});
      });
  });
  it('bookmakrks/:id returns a 404 code if the book is not in list',()=>{
    return request(app)
      .get('/bookmarks/nonsense')//is this how to do this?
      .expect(404)
      .expect({error:'book not found'});
  });
});
describe('POST bookmar endpoint',()=>{
  it('response with a 201 code',()=>{
    return request(app)
      .post('/bookmarks')  
      .expect(201);
  });
  it('only accepts json objects',()=>{
    return request(app)
      .post('/bookmarks')
      .set({'Content-Type':'text/plain'})
      .send('hello world')
      .expect(400);
  });
  it('only accept valid objects',()=>{
    return request(app)
      .post('/bookmarks/nonsense')//is this how to do this?
      .expect(404)
      .expect((res)=>{
        expect(res.body).to.be.an('array');
        expect(res.body.length === 1);
        expect(res.body).to.eql({todo:'somevalue'});
      });
  });
});
describe('DELETE endpoint',()=>{
  it('returns a 404 when book cant be found',()=>{
    return request(app)
      .delete('/bookmarks/nonsense')//is this how to do this?
      .expect(404)
      .expect({error:'book not found'});
  });
  it('returns a 204 when book is delete and deletes book',()=>{
    return request(app)
      .delete('/bookmarks/nonsense')//todo chand to valid path
      .expect(204);
  });
});