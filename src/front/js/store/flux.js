const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			caches: [],
			cachesToShow: [],
			userActive: null,
			currentUser: {favorites:[]},
			is_favorite: false,
		},

		actions: {
			getCaches: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/cache");
				const data = await response.json();
				setStore({ caches: data.results })
			},

			getCachesToShow: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/ToShowcache");
				const data = await response.json();
				setStore({ cachesToShow: data.results })
			},

			validateUser: async () => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/user",
					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					}
				);
				const data = await response.json();
				if (response.ok) setStore({ userActive: true, currentUser: data.response, admin: data.response.is_admin });
			},

			getUpdateUser: async (email, name, country, city, date_of_birth) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/updateUser-user", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
					body: JSON.stringify({
						"email": email,
						"name": name,
						"country": country,
						"city": city,
						"date_of_birth": date_of_birth,
					}),
				});
				const data = await response.json();
				console.log(data);
				if (response.ok) setStore({ currentUser: data.user });
			},

			updateUserPassword: async (password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/updateUser-password", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
					body: JSON.stringify({
						"password": password,


					}),
				});
				const data = await response.json();
				if (response.ok) setStore({ currentUser: data.user });
			},

			updateUserPass: async (currentPassword, newPassword, confirmPassword) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/updateUser-pass", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
					body: JSON.stringify({
						"currentPassword": currentPassword,
						"newPassword": newPassword,
						"confirmPassword": confirmPassword,
					}),
				});
				const data = await response.json();
				console.log(data);
				if (response.ok) setStore({ currentUser: data.user });
			},

			favoritesCaches: async (id) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/favorites-caches",
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
						body: JSON.stringify({
							id: id,
						}),
					}
				);
				const responsetoJson = await response.json();
				if (response.ok) {
					getActions().getCaches();
				} else {
					setError(responsetoJson.response);
				}
			},

			createFavoritesCaches: async (id) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/create-user-favorites",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
						body: JSON.stringify({
							id: id,
						}),
					}
				);
				const responsetoJson = await response.json();
				if (response.ok) {
					getActions().validateUser();

				} else {
					setError(responsetoJson.response);
				}
			},

			logout: () => {
				try {
					localStorage.removeItem("token");
					setStore({ userActive: null, currentUser: {} });
					return true;
				} catch (e) {
					console.log(e);
					return false;
				}
			},

			uploadImage: async (body, apiURL) => {
				console.log(body)
				const options = {
					method: "POST",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},

					body: body
				}

				const response = await fetch(process.env.BACKEND_URL + apiURL, options)
				if (response.status == 200) { return response.json() }
			},

			uploadImageCache: async (body) => {
				console.log(body)
				const options = {
					method: "POST",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
					body: body
				}
				

				const response = await fetch(process.env.BACKEND_URL + "/api/perfil-galery", options)
				if (response.status == 200) { return await response.json() }
	
				
			},




		}
	};
};

export default getState;
