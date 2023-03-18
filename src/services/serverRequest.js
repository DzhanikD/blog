export default class ServerRequest {
  #apiBase = 'https://blog.kata.academy/api';

  async getResource(url, token) {
    const result = await fetch(`${this.#apiBase}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!result.ok) {
      throw new Error(`could not fetch content. Error: ${result.status}`);
    }
    const body = await result.json();
    return body;
  }

  async getArticles(page) {
    const body = await this.getResource(`/articles?offset=${page}`);
    return body;
  }

  async getSingleArticle(slug) {
    const body = await this.getResource(`/articles/${slug}`);
    return body;
  }

  async getCurrentUser(token) {
    const body = await this.getResource('/user/', token);
    return body;
  }

  async postResource(url, obj) {
    const body = await fetch(`${this.#apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(obj),
    });
    if (!body.ok && body.status !== 422) {
      throw new Error(`could not fetch content. Error: ${body.status}`);
    }
    const result = await body.json();
    return result;
  }

  async postNewUser(obj) {
    const body = await this.postResource('/users/', obj);
    return body;
  }

  async postLoginUser(obj) {
    const body = await this.postResource('/users/login', obj);
    return body;
  }

  async postCreateArticle(obj) {
    const body = await fetch(`${this.#apiBase}/articles/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${obj.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(obj.body),
    });
    if (!body.ok) {
      throw new Error(`could not fetch content. Error: ${body.status}`);
    }
    const result = await body.json();
    return result;
  }

  async putResource(objForRequestPut) {
    const body = await fetch(`${this.#apiBase}/user/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${objForRequestPut.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objForRequestPut.body),
    });
    if (!body.ok && body.status !== 422) {
      throw new Error(`could not fetch content. Error: ${body.status}`);
    }
    const result = await body.json();
    return result;
  }

  async putEditArticle(obj) {
    const body = await fetch(`${this.#apiBase}/articles/${obj.slug}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${obj.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(obj.body),
    });
    if (!body.ok) {
      throw new Error(`could not fetch content. Error: ${body.status}`);
    }
    const result = await body.json();
    return result;
  }

  async deleteArticle(obj) {
    const body = await fetch(`${this.#apiBase}/articles/${obj.slug}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${obj.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!body.ok) {
      throw new Error(`could not fetch content. Error: ${body.status}`);
    }
  }
}
