class APIClients {
  async getFetch(endpoint, headers) {
    try {
      const response = await fetch(`https://crmbackend.uz/api/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok && response.status != 401) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      } else if (response.ok == false && response.status == 401) {
        return response;
      }
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async postFetch(endpoint, body, headers, params) {
    try {
      const response = await fetch(`https://crmbackend.uz/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
        params,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async putFetch(endpoint, id, body, headers, params) {
    try {
      const response = await fetch(
        `https://crmbackend.uz/api/${endpoint}/${id}/`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          params,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFetch(endpoint, id, headers) {
    try {
      const response = await fetch(
        `https://crmbackend.uz/api/${endpoint}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        }
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const apiClients = new APIClients();

export { apiClients };
