const app = require('../src/app');

describe('requires api key',()=>{
  it('returns a 200 if correct api is given',()=>{
    return request(app).get('/bookmarks')
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(200);
  });
  it('returns a 401 if incorect key is provided',()=>{
    return request(app).get('/bookmarks')
      .set({'Authorize': 'Bearer pizza'})
      .expect(401);
  });
  it('returns a 401 if no key is provided',()=>{
    return request(app).get('/bookmarks').expect(401);
  });
});
describe('GET /bookmarks endpoint',()=>{
  it('response with a 200 code',()=>{
    return request(app)
      .get('/bookmarks')
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(200);
  });
  it('returns all bookmarks',()=>{
    return request(app)
      .get('/bookmarks')
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(200)
      .expect((res)=>{
        expect(res.body).to.be.an('array');
        expect(res.body.length > 0);
      });
  });
  it('bookmarks/:id returns a single book',()=>{
    return request(app)
      .get('/bookmarks/test1')//is this how to do this?
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(200)
      .expect((res)=>{
        expect(res.body).to.be.an('object');
        expect(res.body).to.eql(
          {
            'id': 'test1',
            'title': 'aladdin',
            'content': 'a book '
          });
        //expect(res.body).to.eql({todo:'somevalue'});
      });
  });
  it('bookmakrks/:id returns a 404 code if the book is not in list',()=>{
    return request(app)
      .get('/bookmarks/nonsense')//is this how to do this?
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(404)
      .expect({error:'book not found'});
  });
});
describe('POST bookmar endpoint',()=>{
  it('response with a 201 code',()=>{
    return request(app)
      .post('/bookmarks')
      .set({'Authorization': 'Bearer 6094021649'})
      .send({title:'test',content:'this is a test'})  
      .expect(201);
  });
  it('only accepts json objects',()=>{
    return request(app)
      .post('/bookmarks')
      .set({'Authorization': 'Bearer 6094021649'})
      .set({'Content-Type':'text/plain'})
      .send('hello world')
      .expect(400);
  });
  it('only accept valid objects',()=>{
    return request(app)
      .post('/bookmarks')//is this how to do this?
      .set({'Authorization': 'Bearer 6094021649'})
      .send({tit:'test',content:'this is a test'})
      .expect(400);
  });
});
describe('DELETE endpoint',()=>{
  it('returns a 404 when book cant be found',()=>{
    return request(app)
      .delete('/bookmarks/nonsense')//is this how to do this?
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(404)
      .expect({error:'book not found'});
  });
  it('returns a 204 when book is delete and deletes book',()=>{
    return request(app)
      .delete('/bookmarks/test1')
      .set({'Authorization': 'Bearer 6094021649'})
      .expect(204);
  });
});