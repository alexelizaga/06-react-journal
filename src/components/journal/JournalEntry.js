import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    console.log('EntryClick');
    dispatch (
      activeNote(id, {
        date, title, body, url
      })
    );
  }

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeInDown animate__faster"
      onClick={ handleEntryClick }
    >
      
      {
        url && (
          <div
            className="journal__entry-picture"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`
            }}
          ></div>
        )
      }
        

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          { title }
        </p>
        <p className="journal__entry-content">
          { body }
        </p>
      </div>

      <div className='space'></div>

      <div className="journal__entry-date-box">
        <span>{ noteDate.format('dddd') }</span>
        <h4> { noteDate.format('Do') } </h4>
      </div>

    </div>
  )
}

JournalEntry.propTypes = {
  id: PropTypes.string,
  date: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  url: PropTypes.string
}