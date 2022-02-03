import React, { useCallback, useState } from 'react';
import { Center, VStack, Fab, Icon, useColorModeValue } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';

import ThemeToggle from '../components/theme-toggle';
import TaskList from '../components/task-list';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Do laundry',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn new technologies',
    done: false
  }
];

export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = newData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject
      };
      return newData;
    });
  }, []);

  const handleFinishEditing = useCallback(() => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditing}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveTaskItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ]);
          setEditingItemId(id);
        }}
      />
    </Center>
  );
}
