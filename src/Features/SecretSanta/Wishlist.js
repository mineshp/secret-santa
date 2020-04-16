import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Loading from '../../Shared/Loading';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Notification from '../../Shared/Notification';
import './Wishlist.css';

import useInput from '../../Shared/useInput';
import { getToken, getMember, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

const myWishlist = (
  showNotification,
  notificationMessage,
  wishlistFor,
  setButtonSizeByDeviceRes,
  bindGiftIdea1,
  bindGiftIdea2,
  bindGiftIdea3,
  handleSubmit
) => (
  <Form size='tiny' onSubmit={handleSubmit}>
    <div className="wishlist-bg">
      <div className="wrapper-wishlist">
        <div className="box-wishlist a-wishlist">
          { showNotification && notificationMessage
          && (
          <Notification
            type={notificationMessage.type}
            messageHeader={notificationMessage.messageHeader}
          />
          )
        }
        </div>
        <div data-testid="members-wishlist" className="box-wishlist b-wishlist wishlist-heading">{`${wishlistFor}'s Wishlist`}</div>
        <div className="box-wishlist c-wishlist"><Form.Field key='gift-1' width="sixteen">
          <Form.Input
            name='giftIdea1'
            placeholder='Gift Idea 1'
            {...bindGiftIdea1}
          />
        </Form.Field></div>
        <div className="box-wishlist d-wishlist"><Form.Field key='gift-1' width="sixteen">
          <Form.Field key='gift-2'>
            <Form.Input
              name='giftIdea2'
              placeholder='Gift Idea 2'
              {...bindGiftIdea2}
            />
          </Form.Field>
        </Form.Field></div>
        <div className="box-wishlist e-wishlist"><Form.Field key='gift-3' width="sixteen">
          <Form.Input
            name='giftIdea3'
            placeholder='Gift Idea 3'
            {...bindGiftIdea3}
          />
        </Form.Field></div>
        <div className="box-wishlist f-wishlist"></div>
        <div className="box-wishlist g-wishlist">{
          <Button color="pink" size={setButtonSizeByDeviceRes()} type="submit" className="" data-testid="save-btn">
            Save
          </Button>
        }</div>
        <div className="box-wishlist h-wishlist"></div>
        <div className="box-wishlist i-wishlist"><Button color="grey" size={setButtonSizeByDeviceRes()} as={Link} className="" name="home" to="/" data-testid="back-btn">
          Back
        </Button></div>
      </div>
    </div>
  </Form>
  );

const secretSantasWishlist = (
    showNotification,
    notificationMessage,
    wishlistFor,
    setButtonSizeByDeviceRes,
    wishlist
) => (
  <div className="wishlist-bg">
    <div className="wrapper-wishlist">
      <div className="box-wishlist a-wishlist">
        { showNotification && notificationMessage
            && (
            <Notification
              type={notificationMessage.type}
              messageHeader={notificationMessage.messageHeader}
            />
            )
          }
      </div>
      <div data-testid="giftees-wishlist" className="box-wishlist b-wishlist wishlist-heading">{`${wishlistFor}'s Wishlist`}</div>
      <div data-testid="giftIdea1" className="c-wishlist readonlylist">{wishlist[0]}</div>
      <div data-testid="giftIdea2" className="d-wishlist readonlylist">{wishlist[1]}</div>
      <div data-testid="giftIdea3" className="e-wishlist readonlylist">{wishlist[2]}</div>
      <div className="box-wishlist f-wishlist"></div>
      <div className="box-wishlist g-wishlist"></div>
      <div className="box-wishlist h-wishlist">
        <Button color="grey" size={setButtonSizeByDeviceRes()} as={Link} className="" name="home" to="/" data-testid="back-btn">
          Back
        </Button>
      </div>
      <div className="box-wishlist i-wishlist"></div>
    </div>
  </div>
  );

export default function Wishlist(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistFor, setWishlistFor] = useState(null);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [readOnlyList, setReadOnlyList] = useState(false);
  const [deviceBP, setDeviceBP] = useState(null);
  const { match } = props;

  const { value: giftIdeaInput1, setValue: setGiftIdeaInput1, bind: bindGiftIdea1 } = useInput('');
  const { value: giftIdeaInput2, setValue: setGiftIdeaInput2, bind: bindGiftIdea2 } = useInput('');
  const { value: giftIdeaInput3, setValue: setGiftIdeaInput3, bind: bindGiftIdea3 } = useInput('');

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
  };

  document.body.className = 'wishlist-page';

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setDeviceBP('mobile');
    } else if (window.innerWidth > 481 && window.innerWidth <= 767) {
      setDeviceBP('tablet');
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setDeviceBP('laptop');
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
      const getGiftIdeasForMember = async () => {
        return api.get(
          `/secretsanta/giftIdeas/${wishlistFor}/${groupName}`,
          { headers: setAuthorisationToken(token) }
        ).catch((err) => console.error(err) || err);
      };

      void async function () {
        const { data } = await getGiftIdeasForMember();
        if (data && data.giftIdeas) {
          setWishlist(data.giftIdeas);
        }
      }();
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
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [showNotification]);

  useEffect(() => {
    if (wishlistUpdated) {
      const token = getToken();
      const setGiftIdeasLastUpdated = async () => {
      return api.put(
        `/secretsanta/giftIdeas/${wishlistFor}/${groupName}/updated`,
        JSON.stringify({ giftIdeasLastUpdated: new Date().toISOString() }),
        { headers: setAuthorisationToken(token) }
      ).catch((err) => console.error(err) || err);
    };

    void async function () {
      await setGiftIdeasLastUpdated();
    }();
    }
  }, [wishlistUpdated, wishlistFor, groupName]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const token = getToken();
    const allGiftIdeaSuggestions = [];
    if (giftIdeaInput1 && giftIdeaInput1 !== '') {
      allGiftIdeaSuggestions.push(giftIdeaInput1);
    }
    if (giftIdeaInput2 && giftIdeaInput2 !== '') {
      allGiftIdeaSuggestions.push(giftIdeaInput2);
    }
    if (giftIdeaInput3 && giftIdeaInput3 !== '') {
      allGiftIdeaSuggestions.push(giftIdeaInput3);
    }

    const response = await api.put(
      `/secretsanta/giftIdeas/${wishlistFor}/${groupName}`,
      JSON.stringify({ giftIdeas: allGiftIdeaSuggestions }),
      { headers: setAuthorisationToken(token) }
    );

    if (response.data) {
      setWishlistUpdated(true);
      displayNotification({
        type: 'positive',
        messageHeader: 'Successfully updated gift ideas.'
      });
    } else {
      displayNotification({
        type: 'negative',
        messageHeader: `Error updating gift ideas, ${response.error}`
      });
    }
  };

  const setButtonSizeByDeviceRes = () => {
    switch (deviceBP) {
      case 'mobile':
        return 'tiny';
      case 'tablet':
        return 'large';
      case 'laptop':
        return 'large';
      case 'largeDesktop':
        return 'big';
      default:
        break;
    }
  };

  if (!wishlistFor && wishlist) {
    return <Loading />;
  }

  return (
    <Container>
      {
        readOnlyList
        ? secretSantasWishlist(
          showNotification,
          notificationMessage,
          wishlistFor,
          setButtonSizeByDeviceRes,
          wishlist
          )
        : myWishlist(
          showNotification,
          notificationMessage,
          wishlistFor,
          setButtonSizeByDeviceRes,
          bindGiftIdea1,
          bindGiftIdea2,
          bindGiftIdea3,
          handleSubmit
        )
    }
    </Container>
    );
}

Wishlist.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      memberName: PropTypes.string,
      groupID: PropTypes.string
    })
  })
};