const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const copyHyperText = (text, url) => {
  const link = document.createElement('a');
  link.text = text;
  link.href = url;
  link.style.textDecorationColor = 'rgb(17, 85, 204)';
  link.style.color = 'rgb(17, 85, 204)';
  link.style.fontWeight = '300';
  document.body.appendChild(link);

  const range = document.createRange();
  range.selectNode(link);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
  document.body.removeChild(link);
}

const fromCardDetail = event => {
  const cardDetail = event.path.find(
    e => e.classList && e.classList.value.includes('card-detail-window')
  );

  if (cardDetail) {
    return {
      cardName: cardDetail.getElementsByClassName('card-detail-title-assist')[0].innerText,
      cardHref: window.location.href,
      card: cardDetail,
    };
  }
};

const fromCard = event => {
  const card = event.path.find(
    e => e.classList && e.classList.value.includes('list-card js-member-droppable')
  );

  if (card) {
    return {
      cardName: card.getElementsByClassName('js-card-name')[0].innerText,
      cardHref: card.href,
      card,
    };
  }
};

const animate = card => {
  const previousBorder = card.style.border;
  card.style.border = '2px solid orange';

  setTimeout(() => {
    card.style.border = previousBorder;
  }, 300);
};

window.addEventListener('click', function handleOnclick (event) {
  event.stopPropagation();
  if (event.shiftKey) {
    const cardData = fromCardDetail(event) || fromCard(event);
    const { cardName, cardHref, card } = cardData || {};

    if(card) {
      animate(card)

      if (event.metaKey) {
        copyToClipboard(`[${cardName}](${cardHref})`);
      } else {
        copyHyperText(cardName, cardHref);
      }
      event.preventDefault();
    }
  }
});
