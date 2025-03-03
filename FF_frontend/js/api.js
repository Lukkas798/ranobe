const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

const formatterDate = (timestamp) => {
  const base = new Date(timestamp)

  return base.toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'})
}

// Components
const articleCardComponent = ({id, title, tag, timestamp}) => `
  <p class="text-subtitle color_white text-strip">${title}</p>
  <p class="text-body">${formatterDate(timestamp)}</p>
  <p class="text-body color_primary text-bold">${tag}</p>
  <a href="pages/info.html" class="button">Оқу</a>
`


// Requests
const getArticles = async () => {
  const response = await axiosInstance.get('/articles');
  return response?.data;
}

const getArticleInfo = async (id) => {
  const response = await axiosInstance.get('/articles/' + id);
  return response?.data;
}

const generateArticles = async () => {
  const articles = await getArticles()

  const wrapper = document.querySelector('[data-card-wrapper]')
  wrapper.innerHTML = ''

  articles?.map((article) => {
    const card = document.createElement("a");
    card.href = `pages/info.html?id=${article.id}`;
    card.classList.add("flex-column", "card", "flex-1");
    card.dataset.id = article.id;
    card.innerHTML = articleCardComponent(article);

    wrapper?.appendChild(card)
  })
}

const generateArticleDetails = async () => {
  const params = window.location.search
  const id = params.split('=')?.[1] || 1;

  const articleInfo = await getArticleInfo(id)
  console.log(articleInfo)

  const title = document.querySelector('[data-card-title]')
  const body = document.querySelector('[data-card-body]')
  const time = document.querySelector('[data-card-time]')
  const tag = document.querySelector('[data-card-tag]')

  title.textContent = articleInfo?.title || ''
  body.textContent = articleInfo?.body || ''
  time.textContent = articleInfo?.time || ''
  tag.textContent = articleInfo?.tag || ''
}
