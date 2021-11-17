import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Loading from '../../Shared/Loading';
import Notification from '../../Shared/Notification';
import Url from '../../Utils/Url';

import './Wishlist.css';
import '../../Shared/Notification.css';

import useInput from '../../Shared/useInput';
import {
  getToken,
  getMember,
  setAuthorisationToken,
} from '../Authentication/Auth';
import api from '../../Services/api';

const myWishlist = (
  notificationState,
  notificationMessage,
  wishlistFor,
  setButtonSizeByDeviceRes,
  bindGiftIdea1,
  bindGiftIdea2,
  bindGiftIdea3,
  handleSubmit,
  quote
) => (
  <div>
    <div
      data-testid="notification"
      className={`${notificationState} notification-wrapper`}
    >
      {notificationState === 'show' && notificationMessage && (
        <Notification
          type={notificationMessage.type}
          messageHeader={notificationMessage.messageHeader}
        />
      )}
    </div>
    <Form size="tiny" onSubmit={handleSubmit}>
      <div className="form-fields-wrapper">
        <div
          className="row-field heading-row wishlist-heading-x"
          data-testid="members-wishlist"
        >
          {`${wishlistFor}'s Wishlist`}
        </div>
        <div className="row-field">
          <Form.Field key="gift-1" width="sixteen">
            <Form.Input
              name="giftIdea1"
              placeholder="Gift Idea 1"
              {...bindGiftIdea1}
            />
          </Form.Field>
        </div>
        <div className="row-field">
          <Form.Field key="gift-2" width="sixteen">
            <Form.Input
              name="giftIdea2"
              placeholder="Gift Idea 2"
              {...bindGiftIdea2}
            />
          </Form.Field>
        </div>
        <div className="row-field">
          <Form.Field key="gift-3" width="sixteen">
            <Form.Input
              name="giftIdea3"
              placeholder="Gift Idea 3"
              {...bindGiftIdea3}
            />
          </Form.Field>
        </div>
        <div className="button-group">
          <Button
            color="pink"
            size={setButtonSizeByDeviceRes()}
            type="submit"
            data-testid="save-btn"
          >
            Save
          </Button>
          <Button
            color="grey"
            size={setButtonSizeByDeviceRes()}
            as={Link}
            className="back-btn"
            name="home"
            to="/"
            data-testid="back-btn"
          >
            Back
          </Button>
        </div>
        <blockquote className="display-quote">
          <p>{quote}</p>
        </blockquote>
      </div>
    </Form>
  </div>
);

const secretSantasWishlist = (
  wishlistFor,
  setButtonSizeByDeviceRes,
  wishlist,
  quote
) => (
  <div className="form-fields-wrapper">
    <div
      className="row-field heading-row wishlist-heading-x"
      data-testid="giftees-wishlist"
    >
      {`${wishlistFor}'s Wishlist`}
    </div>
    <div data-testid="giftIdea1" className="row-field readonlylist">
      {wishlist[0] && Url.isUrl(wishlist[0]).valid ? (
        <a rel="noopener noreferrer" target="_blank" href={wishlist[0]}>
          My gift idea, click to view
        </a>
      ) : (
        wishlist[0]
      )}
    </div>
    <div data-testid="giftIdea2" className="row-field readonlylist">
      {wishlist[1] && Url.isUrl(wishlist[1]).valid ? (
        <a rel="noopener noreferrer" target="_blank" href={wishlist[1]}>
          My gift idea, click to view
        </a>
      ) : (
        wishlist[1]
      )}
    </div>
    <div data-testid="giftIdea3" className="row-field readonlylist">
      {wishlist[2] && Url.isUrl(wishlist[2]).valid ? (
        <a rel="noopener noreferrer" target="_blank" href={wishlist[2]}>
          My gift idea, click to view
        </a>
      ) : (
        wishlist[2]
      )}
    </div>
    <div className="button-group">
      <Button
        color="grey"
        size={setButtonSizeByDeviceRes()}
        as={Link}
        className=""
        name="home"
        to="/"
        data-testid="back-btn"
      >
        Back
      </Button>
    </div>
    <blockquote className="display-quote">
      <p>{quote}</p>
    </blockquote>
  </div>
);

export default function Wishlist(props) {
  const [notificationState, setNotificationState] = useState('hide');
  const [notificationMessage, setNotificationMessage] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistFor, setWishlistFor] = useState(null);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [readOnlyList, setReadOnlyList] = useState(false);
  const [deviceBP, setDeviceBP] = useState(null);
  const [quote, setQuote] = useState('');

  const { match } = props;

  const {
    value: giftIdeaInput1,
    setValue: setGiftIdeaInput1,
    bind: bindGiftIdea1,
  } = useInput('');
  const {
    value: giftIdeaInput2,
    setValue: setGiftIdeaInput2,
    bind: bindGiftIdea2,
  } = useInput('');
  const {
    value: giftIdeaInput3,
    setValue: setGiftIdeaInput3,
    bind: bindGiftIdea3,
  } = useInput('');

  const displayNotification = (messageData) => {
    setNotificationState('show');
    return setNotificationMessage(messageData);
  };

  document.body.className = 'wishlist-page';

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setDeviceBP('mobile');
    } else if (window.innerWidth >= 481 && window.innerWidth <= 767) {
      setDeviceBP('small-tablet');
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      setDeviceBP('tablet');
    } else if (window.innerWidth > 1024) {
      setDeviceBP('largeDesktop');
    }
  }, []);

  useEffect(() => {
    setWishlistFor(match.params.memberName);
    setGroupName(match.params.groupID);
  }, [match]);

  useEffect(() => {
    const { memberName } = getMember();
    if (memberName && wishlistFor) {
      setReadOnlyList(memberName !== wishlistFor);
    }
  }, [wishlistFor]);

  useEffect(() => {
    const token = getToken();
    if (wishlistFor) {
      const getGiftIdeasForMember = async () =>
        api
          .get(`/giftIdeas/${wishlistFor}/${groupName}`, {
            headers: setAuthorisationToken(token),
          })
          .catch((err) => err);

      // eslint-disable-next-line no-void
      void (async function () {
        const { data } = await getGiftIdeasForMember();
        if (data && data.giftIdeas) {
          setWishlist(data.giftIdeas);
        }
      })();
    }
  }, [groupName, wishlistFor]);

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setGiftIdeaInput1(wishlist[0] || 'Suprise Me');
      setGiftIdeaInput2(wishlist[1] || 'Suprise Me');
      setGiftIdeaInput3(wishlist[2] || 'Suprise Me');
    }
  }, [setGiftIdeaInput1, setGiftIdeaInput2, setGiftIdeaInput3, wishlist]);

  useEffect(() => {
    if (notificationState) {
      setTimeout(() => setNotificationState('hide'), 3000);
    }
  }, [notificationState]);

  useEffect(() => {
    // Sets the quote initially
    api
      .get('/displayQuotes')
      .then(({ data }) => setQuote(data))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Set random quote every 30secs
      api
        .get('/displayQuotes')
        .then(({ data }) => setQuote(data))
        .catch((err) => err);
    }, 20000);

    return () => clearInterval(intervalId);
  }, [quote]);

  useEffect(() => {
    if (wishlistUpdated) {
      const token = getToken();
      const setGiftIdeasLastUpdated = async () =>
        api
          .put(
            `/giftIdeas/${wishlistFor}/${groupName}/updated`,
            JSON.stringify({ giftIdeasLastUpdated: new Date().toISOString() }),
            { headers: setAuthorisationToken(token) }
          )
          .catch((err) => console.error(err) || err);

      // eslint-disable-next-line no-void
      void (async function () {
        await setGiftIdeasLastUpdated();
      })();
    }
  }, [wishlistUpdated, wishlistFor, groupName]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const token = getToken();
    const allGiftIdeaSuggestions = [];
    if (giftIdeaInput1 && giftIdeaInput1 !== '') {
      allGiftIdeaSuggestions.push(encodeURI(giftIdeaInput1));
    }
    if (giftIdeaInput2 && giftIdeaInput2 !== '') {
      allGiftIdeaSuggestions.push(encodeURI(giftIdeaInput2));
    }
    if (giftIdeaInput3 && giftIdeaInput3 !== '') {
      allGiftIdeaSuggestions.push(encodeURI(giftIdeaInput3));
    }

    const response = await api.put(
      `/giftIdeas/${wishlistFor}/${groupName}`,
      JSON.stringify({ giftIdeas: allGiftIdeaSuggestions }),
      { headers: setAuthorisationToken(token) }
    );

    if (response.data) {
      setWishlistUpdated(true);
      displayNotification({
        type: 'positive',
        messageHeader: 'Successfully updated gift ideas.',
      });
    } else {
      displayNotification({
        type: 'negative',
        messageHeader: `Error updating gift ideas, ${response.error}`,
      });
    }
  };

  // eslint-disable-next-line consistent-return
  const setButtonSizeByDeviceRes = () => {
    switch (deviceBP) {
      case 'mobile':
        return 'small';
      case 'small-tablet':
        return 'medium';
      case 'tablet':
        return 'big';
      case 'laptop':
        return 'big';
      case 'largeDesktop':
        return 'huge';
      default:
        break;
    }
  };

  if (!wishlistFor && wishlist) {
    return <Loading />;
  }
  return (
    <Container>
      {readOnlyList
        ? secretSantasWishlist(
            wishlistFor,
            setButtonSizeByDeviceRes,
            wishlist,
            quote
          )
        : myWishlist(
            notificationState,
            notificationMessage,
            wishlistFor,
            setButtonSizeByDeviceRes,
            bindGiftIdea1,
            bindGiftIdea2,
            bindGiftIdea3,
            handleSubmit,
            quote
          )}
    </Container>
  );
}

Wishlist.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      memberName: PropTypes.string,
      groupID: PropTypes.string,
    }),
  }),
};

Wishlist.defaultProps = { match: PropTypes.shape({}) };
