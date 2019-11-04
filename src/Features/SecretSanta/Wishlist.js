import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Loading from '../../Shared/Loading';
import Notification from '../../Shared/Notification';

import useInput from '../../Shared/useInput'
import { getToken, getMember, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

export default function Wishlist(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistFor, setWishlistFor] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [readOnlyList, setReadOnlyList] = useState(false);
  const { match } = props;

  const { value: giftIdeaInput1, setValue: setGiftIdeaInput1, bind: bindGiftIdea1 } = useInput('');
  const { value: giftIdeaInput2, setValue: setGiftIdeaInput2, bind: bindGiftIdea2 } = useInput('');
  const { value: giftIdeaInput3, setValue: setGiftIdeaInput3, bind: bindGiftIdea3 } = useInput('');

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
  };

  useEffect(() => {
    const token = getToken();
    const getGiftIdeasForMember = async (member) => {
      return api.get(
        `/secretsanta/giftIdeas/${wishlistFor}/${groupName}`,
        { headers: setAuthorisationToken(token) }
      ).catch(console.error);
    }

    const fetchData = async () => {
      const { data } = await getGiftIdeasForMember(wishlistFor);
      if (data && data.giftIdeas) {
        setWishlist(data.giftIdeas);
      }
    };
    fetchData();
  }, [groupName, wishlistFor]);

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setGiftIdeaInput1(wishlist[0]);
      setGiftIdeaInput2(wishlist[1]);
      setGiftIdeaInput3(wishlist[2]);
    }
  }, [setGiftIdeaInput1, setGiftIdeaInput2, setGiftIdeaInput3, wishlist]);

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const token = getToken();
    const allGiftIdeaSuggestions = [];
    allGiftIdeaSuggestions.push(giftIdeaInput1, giftIdeaInput2, giftIdeaInput3);
    const response = await api.put(
      `/secretsanta/giftIdeas/${wishlistFor}/${groupName}`,
      JSON.stringify({ giftIdeas: allGiftIdeaSuggestions }),
      { headers: setAuthorisationToken(token) }
    );

    if (response.data) {
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

  const buttonClassName = (!readOnlyList)
    ? "box-wishlist"
    : "box-wishlist one-col-span";

  if (!wishlistFor && wishlist) {
    return <Loading />;
  }
  return (
      <div className="container-wishlist">
        <Header
          as='h1'
          content={`${wishlistFor.charAt(0).toUpperCase() + wishlistFor.slice(1)}'s Wishlist`}
          className='wishlist-header'
        />
        <form onSubmit={handleSubmit}>
          <div className="flex-container">
          <div className="flex-item">
          { showNotification && notificationMessage
            && (
            <Notification
              type={notificationMessage.type}
              messageHeader={notificationMessage.messageHeader}
            />
            )
          }
              <div className="box-wishlist one-col-span wishlist-input" key='gift-1'>
                <Form.Field key='gift-1'>
                  <Form.Input
                    name='giftIdea1'
                    placeholder='Gift Idea 1'
                    width={9}
                    readOnly={readOnlyList}
                    {...bindGiftIdea1}
                  />
                </Form.Field>
            </div>
            <div className="box-wishlist one-col-span wishlist-input" key='gift-2'>
                <Form.Field key='gift-2'>
                  <Form.Input
                    name='giftIdea2'
                    placeholder='Gift Idea 2'
                    width={9}
                    readOnly={readOnlyList}
                    {...bindGiftIdea2}
                  />
                </Form.Field>
            </div>
            <div className="box-wishlist one-col-span wishlist-input" key='gift-3'>
                <Form.Field key='gift-3'>
                  <Form.Input
                    name='giftIdea3'
                    placeholder='Gift Idea 3'
                    width={9}
                    readOnly={readOnlyList}
                    {...bindGiftIdea3}
                  />
                </Form.Field>
            </div>
            {
              !readOnlyList &&
              <div className={buttonClassName}>
                <Button color="yellow" type="submit" className="wishlist-submit-btn">
                Save
                </Button>
              </div>
            }
              <div className={buttonClassName}>
                <Button color="green" as={Link} className="wishlist-submit-btn" name="home" to="/">
                  Home
                </Button>
            </div>
            </div>
        </div>
        </form>
      </div>
    );
};
