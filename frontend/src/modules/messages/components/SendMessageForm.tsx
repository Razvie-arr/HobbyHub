import { useMutation } from '@apollo/client';
import { Box, Icon, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { NonEmptyArray } from 'effect/dist/declarations/src/ReadonlyArray';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';

import { User } from '../../../gql/graphql';
import { InputField, zod, zodResolver } from '../../../shared/forms';
import { WithAuthUser } from '../../../shared/types';
import { SEND_MESSAGE } from '../mutations';

interface SendMessageFormProps extends WithAuthUser {
  otherUsers: NonEmptyArray<User>;
  refetchMessages: () => Promise<void>;
}

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const defaultValues: FormValues = {
  message: '',
};

export const SendMessageForm = ({ user, otherUsers, refetchMessages }: SendMessageFormProps) => {
  const methods = useForm<FormValues>({ defaultValues, resolver: zodResolver(schema) });

  const [sendMessage, sendMessageRequestState] = useMutation(SEND_MESSAGE);

  const handleSubmit = methods.handleSubmit(async (values) => {
    const promises = otherUsers.map(async (recipient) =>
      sendMessage({ variables: { recipient, sender: user, text: values.message } }),
    );
    await Promise.all(promises);
    await refetchMessages();
    methods.resetField('message');
    methods.setFocus('message');
  });

  return (
    <FormProvider {...methods}>
      <Box w="100%">
        <form onSubmit={handleSubmit} noValidate>
          <InputGroup>
            <InputField
              name="message"
              placeholder="Write a reply..."
              borderRadius="full"
              isDisabled={sendMessageRequestState.loading}
            />
            <InputRightElement width="3rem">
              <IconButton
                borderRadius="full"
                colorScheme="purple"
                aria-label="Send message"
                h="1.75rem"
                size="sm"
                type="submit"
                icon={<Icon as={MdSend} />}
                isDisabled={sendMessageRequestState.loading}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
    </FormProvider>
  );
};

