import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';

import Dialog from '../components/Dialog';
import Selector from './Selector';

export default function GenerateTextPage() {
  const [eventType, setEventType] = useState(null);

  const isBirthDay = eventType === 'birthday';
  const isMarriageProposal = eventType === 'marriage-proposal';
  const isWeddingInvitation = eventType === 'wedding-invitation';
  const isRPGSession = eventType === 'rpg-session';

  return (
    <Dialog
      open
      onClose={() => {}}
      maxWidth="xl"
      title="Generate my Text"
    >
      <Box
        display="flex"
        flexDirection="column"
        minWidth="calc(min(90vw, 600px))"
        sx={{
          gap: '8px',
        }}
      >
        <Selector
          id="event-type"
          label="Which kind of event you're preparing?"
          value={eventType}
          onChange={(event) => setEventType(event.target.value)}
          options={[
            { label: 'Birthday', value: 'birthday' },
            { label: 'Marriage Proposal', value: 'marriage-proposal' },
            { label: 'Wedding Invitation', value: 'wedding-invitation' },
            { label: 'Wedding Anniversary', value: 'wedding-anniversary' },
            { label: 'RPG Session', value: 'rpg-session' },
            { label: 'Other', value: 'other' },
          ]}
        />
        {isBirthDay && (
        <>
          <TextField
            label="What is the name of the birthday person"
            variant="outlined"
          />
          <TextField
            label="How many years is he/she completing?"
            variant="outlined"
          />
          <TextField
            label="When is the birthday?"
            variant="outlined"
          />
          <TextField
            label="Describe the person in some words"
            variant="outlined"
          />
        </>
        )}
        {isMarriageProposal && (
        <>
          <TextField
            label="What is your name?"
            variant="outlined"
          />
          <TextField
            label="Who are you marrying?"
            variant="outlined"
          />
        </>
        )}
        {isWeddingInvitation && (
        <>
          <TextField
            label="Who is the bride?"
            variant="outlined"
          />
          <TextField
            label="Who is the groom?"
            variant="outlined"
          />
          <TextField
            label="When are you marrying?"
            variant="outlined"
          />
        </>
        )}
        {isRPGSession && (
        <>
          <TextField
            label="Describe the RPG Session"
            variant="outlined"
            multiline
            rows={5}
          />
        </>
        )}
        <TextField
          id="other-details"
          label="Tell us other details about the event"
          variant="outlined"
          multiline
          rows={5}
        />
      </Box>
    </Dialog>
  );
}
