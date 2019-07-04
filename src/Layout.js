import React from 'react';
import styled from 'styled-components';
import Files from './Files';
import Actions from './Actions';

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 20px 0;
  width: 100%;
  margin: auto;
  display: flex;
`

const FilesWrapper = styled.div`
  flex: 1;
`

const ActionsWrapper = styled.div`
  width: 300px;
`
const defaultRows = [
  {
    type: 'folder',
    name: 'Documents',
    child: [{
      type: 'folder',
      name: 'Photos',
      child: []
    }]
  },
  {
    type: 'folder',
    name: 'Downloads',
    child: []
  }
];

export default () => {
  const [rows, setRows] = React.useState(defaultRows);
  const [filepath, setFilepath] = React.useState([]);

  const validateNewData = (rows, data) => {
    return !rows.find(row => (row.name === data.name && row.type === data.type))
  }

  const updateRow = (data) => {
    if (filepath.length === 0) {
      if (validateNewData(rows, data)) {
        setRows([...rows, data]);
      }
    } else {
      let newRows = [...rows];
      let temp = newRows;
      filepath.map((name) => {
        const data = temp.find(c => c.name === name);
        if (data) {
          temp = data.child;
        }
        return name;
      })
      if (temp && validateNewData(temp, data)) {
        temp.push(data);
      }
      setRows(newRows);
    }
  }

  const filterRows = (arr, selected) => {
    for( let i = 0; i < arr.length; i++) { 
      if ( selected.indexOf(arr[i].name) !== -1 ) {
        arr.splice(i, 1); 
        i--;
      }
   }
  }

  const handleRemoveSelectedItems = (selected) => {
    if (filepath.length === 0) {
      const newRows = [...rows];
      filterRows(newRows, selected)
      setRows(newRows);
    } else {
      let newRows = rows;
      let temp = [...newRows];
      filepath.map((name) => {
        const data = temp.find(c => c.name === name)
        if (data) {
          temp = data.child;
        }
        return name;
      })
      if (temp) {
        filterRows(temp, selected)
      }
      setRows(newRows);
    }
  }
  return (
    <Wrapper>
      <FilesWrapper>
        <Files
          defaultData={rows}
          setFilepath={setFilepath}
          filepath={filepath}
          removeSelectedItems={handleRemoveSelectedItems}
        />
      </FilesWrapper>
      <ActionsWrapper>
        <Actions
          updateRow={updateRow}
        />
      </ActionsWrapper>
    </Wrapper>
  )
}