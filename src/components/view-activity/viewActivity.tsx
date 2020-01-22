/* tslint:disable */
// react
import React, {useState} from 'react';
// third-party react library
import {
  Button, Form, Input, Table, Icon, notification, Typography, Dropdown, Modal, Menu, Row, Col, Tooltip, TimePicker
} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';

// types
import moment from "moment";
import { ICreateActivity } from "../../redux/actions/user/user.d";

const { Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  data: []
  form: any
  isCollapsed: boolean
  deleteActivityAsync: (id: number) => void
  editActivityAsync: (data: ICreateActivity) => void
}

const { TextArea } = Input;

// @ts-ignore
export const ViewActivityComponent: React.FC = (props: Props) => {
  const { data, isCollapsed, deleteActivityAsync, form, editActivityAsync } = props;
  const { getFieldDecorator } = form;
  const [searchText, setSearchText] = useState('');
  const [filteredTable, setFilteredTable] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState('asc');
  const [selectedActivityId, setSelectedActivityId] = useState();
  const [selectedActivityName, setSelectedActivityName] = useState('');
  const [selectedActivityDescription, setSelectedActivityDescription] = useState('');
  const [selectedActivityStartTime, setSelectedActivityStartTime] = useState('');
  const [selectedActivityEndTime, setSelectedActivityEndTime] = useState('');
  const [selectedActivityDateCreated, setSelectedActivityDateCreated] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false)
  
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  
  // @ts-ignore
  let searchInput: Input | null  = null;
  
  /**
   * handleSearch
   *
   * @param selectedKeys
   * @param confirm
   */
  const handleSearch = (selectedKeys: React.SetStateAction<string>[], confirm: () => void) => {
    confirm();
    setSearchText(selectedKeys[0])
  }
  
  /**
   * handleOk
   *
   * @param e
   */
  const handleOk = (e: any) => {
    setModalVisibility(!modalVisibility)
    handleSubmit(e)
  };
  
  /**
   * handleCancel
   *
   * @param e
   */
  const handleCancel = (e: any) => {
    setModalVisibility(!modalVisibility)
    props.form.resetFields()
  };
  
  /**
   *
   */
  const handlePrinting = () => {
    
    !isCollapsed
      ? showNotification("Tip!", `Collapse side bar `, "info")
      : window.print()
  }
  
  /**
   * toggleDate
   *
   * @param data
   */
  const toggleDate = (data: any[] | undefined) => {
    
    if (selectedOrder === "asc") {
      // @ts-ignore
      const sortDates = (a, b) => moment(a.dateCreated).format('YYYYMMDD') - moment(b.dateCreated).format('YYYYMMDD')
      // @ts-ignore
      const ascendingDate = data.sort(sortDates)
      // @ts-ignore
      setFilteredTable(ascendingDate)
    } else {
      // @ts-ignore
      const sortDates = (a, b) => moment(b.dateCreated).format('YYYYMMDD') - moment(a.dateCreated).format('YYYYMMDD')
      // @ts-ignore
      const descendingDate = data.sort(sortDates)
      // @ts-ignore
      setFilteredTable(descendingDate)
    }
    
    return selectedOrder === "asc" ? setSelectedOrder("desc") : setSelectedOrder("asc")
  }
  
  /**
   * handleReset
   *
   * @param clearFilters
   */
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('')
  }
  
  
  /**
   * getColumnSearchProps
   *
   * @param dataIndex
   * @return {{filterDropdown: (function({setSelectedKeys: *, selectedKeys?: *, confirm?: *, clearFilters?: *}): *), filterIcon: (function(*): *), onFilter: (function(*, *): boolean), onFilterDropdownVisibleChange: onFilterDropdownVisibleChange, render: (function(*): *)}}
   */
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      // @ts-ignore
                       setSelectedKeys, selectedKeys, confirm, clearFilters,
                     }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => searchInput.select());
      }
    },
    render: (text: string) => {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text && text.toString()}
        />
      )
    },
  })
  
  const handleDeleteActivity = () => {
    confirm({
      title: 'Are you sure you want to delete?',
      content: 'Once you delete this activity you can no longer view it',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        props.form.resetFields()
        deleteActivityAsync(selectedActivityId)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => setModalVisibility(!modalVisibility)}
        key={'edit'}
      >
        edit
      </Menu.Item>
      <Menu.Item
        onClick={handleDeleteActivity}
        key={'delete'}
      >
        delete
      </Menu.Item>
    </Menu>
  );
  
  
  /**
   * columns
   *
   * @type {*[]}
   */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },{
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },{
      title: 'Start By',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchProps('startTime'),
    }, {
      title: 'End By',
      dataIndex: 'endTime',
      key: 'endTime',
      ...getColumnSearchProps('endTime'),
    }, {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      ...getColumnSearchProps('dateCreated'),
      render: (dateCreated: string | undefined) => {
        return (
          <Paragraph style={{ marginTop: '5%', fontSize: 13.5 }}>{moment(dateCreated).format("dddd, MMMM D, YYYY")}</Paragraph>
        )
      }
    }, {
      title: 'Date Updated',
      dataIndex: 'dateUpdated',
      key: 'dateUpdated',
      ...getColumnSearchProps('dateUpdated'),
      render: (dateUpdated: string | undefined) => {
        return (
          <Paragraph style={{ marginTop: '5%', fontSize: 13.5 }}>{moment(dateUpdated).format("dddd, MMMM D, YYYY")}</Paragraph>
        )
      }
    }, {
      render: (record: any) => {
        return (
          <span
            className="table-operation"
          >
            <Dropdown
              onVisibleChange={() => {
                setSelectedActivityId(record.id)
                setSelectedActivityName(record.name)
                setSelectedActivityDescription(record.description)
                setSelectedActivityStartTime(record.startTime)
                setSelectedActivityEndTime(record.endTime)
                setSelectedActivityDateCreated(record.dateCreated)
              }}
              overlay={menu}
            >
              <Button>
                ACTION
                <Icon type="caret-down" />
              </Button>
            </Dropdown>
          </span>
        )
      },
    },
  ];
  
  /**
   * notification
   *
   * @param heading
   * @param message
   * @param type
   */
  const showNotification = (heading: any, message: any, type: any) => {
    // @ts-ignore
    notification[`${type}`]({
      message: `${heading}`,
      description: `${message}`,
      style: {
        width: '100%'
      },
    });
  };
  
  /**
   * handleSubmit
   *
   * @param e
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      let newObject = {
        ...values,
        id: selectedActivityId,
        startTime: startTime === undefined ? selectedActivityStartTime : startTime,
        endTime: endTime === undefined ? selectedActivityEndTime : endTime,
        dateCreated: selectedActivityDateCreated,
        dateUpdated: moment(),
      }
      editActivityAsync(newObject)
    });
  }
  
  return (
    <div
      style={{
        padding: 24,
        background: '#fff',
        minHeight: '90vh',
      }}
    >
      
      <Table
        pagination={{
          defaultPageSize: 5,
          total: data.length,
          pageSizeOptions: ["5", "10", "20", "30"],
          showSizeChanger: true,
          locale: {items_per_page: ""}
        }}
        title={() => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              
              <Button
                onClick={() => handlePrinting()}
                icon="printer"
              >
                Print
              </Button>
  
              <Button
                onClick={() => toggleDate(data)}
                icon={selectedOrder === "asc" ? "caret-up" : "caret-down"}
              >
                {selectedOrder === "asc" ? 'ASC' : 'DESC'}
              </Button>
            </div>
          )
        }}
        rowKey="reference"
        columns={columns}
        dataSource={filteredTable || data}
        scroll={{ x: 'max-content' }}
      />
  
      <Modal
        title="Manage your rithms"
        visible={modalVisibility}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Edit"}
      >
        <div
          style={{
            margin: 'auto',
            width: '65%',
          }}
        >
  
          <Form onSubmit={handleSubmit} className="login-form">
            <Row gutter={50}>
              <Col span={50}>
                <Form.Item
                  label={(
                    <span>
                    <Tooltip title="What is the name of your activity?">
                      Activity Name
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('name',{
                    initialValue: selectedActivityName,
                  }, {
                    rules: [{
                      required: true,
                      message: 'Enter activity name!',
                      whitespace: true
                    }],
                  })(
                    <Input
                      name={'name'}
                      allowClear
                      placeholder="e.g Go shopping"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
    
            <Row gutter={50}>
              <Col span={50}>
                <Form.Item
                  label={(
                    <span>
                    <Tooltip title="Tell us more about your activity">
                      Description
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('description',{
                    initialValue: selectedActivityDescription,
                  }, {
                    rules: [{
                      required: true,
                      message: 'Enter activity description!',
                      whitespace: true
                    }],
                  })(
                    <TextArea rows={4} />
                  )}
                </Form.Item>
              </Col>
            </Row>
    
            <Row gutter={50}>
              <Col span={50}>
                <Form.Item>
                  <Form.Item
                    label={(
                      <span>
                      <Tooltip title="What time do you want to start this activity?">
                        Start time
                      </Tooltip>
                    </span>
                    )}
                    style={{ display: 'inline-block', width: 'calc(50% - 2px)' }}
                  >
                    {getFieldDecorator('startTime', {
                      rules: [{
                        required: true,
                        message: 'Enter start time!',
                      }],
                    })(
                      <TimePicker
                        format="h:mm A"
                        use12Hours
                        placeholder={`${selectedActivityStartTime}`}
                        hideDisabledOptions
                        open={startOpen}
                        onOpenChange={setStartOpen}
                        value={startValue}
                        onChange={(time, timeString: string) => {
                          setStartValue(time)
                          setStartTime(timeString)
                        }}
                        disabledHours={() => {
                          // const minHour = min ? min.hours() : -1; // 比0小的
                          const minHour = -1;
                          const maxHour = endValue ? endValue.hours() : 24; // 比23大的
                          return Array.from({ length: 24 }, (v, k) => k).filter(
                            hour => hour < minHour || hour > maxHour
                          );
                        }}
                        disabledMinutes={startSelectedHour => {
                          // const minMinutes = min && startSelectedHour <= min.hours() ? min.minutes() : -1; // 比0小的
                          const minMinutes = -1;
                          const maxMinutes =
                            endValue && startSelectedHour >= endValue.hours()
                              ? endValue.minutes()
                              : 60; // 比59大的
                  
                          return Array.from({ length: 60 }, (v, k) => k).filter(
                            minutes => minutes < minMinutes || minutes > maxMinutes
                          );
                        }}
                        disabledSeconds={(startSelectedHour, startSelectedMinutes) => {
                          // TODO
                          return [];
                        }}
                        addon={() => (
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                              setStartOpen(false);
                              setEndOpen(true);
                            }}
                          >
                            Ok
                          </Button>
                        )}
                      />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '1px', textAlign: 'center' }}></span>
                  <Form.Item
                    label={(
                      <span>
                      <Tooltip title="What time do you want to end this activity">
                        End time
                      </Tooltip>
                    </span>
                    )}
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('endTime', {
                      rules: [{
                        required: true,
                        message: 'Enter end time!',
                      }],
                    })(
                      <TimePicker
                        format="h:mm A"
                        use12Hours
                        placeholder={`${selectedActivityEndTime}`}
                        hideDisabledOptions
                        open={endOpen}
                        onOpenChange={setEndOpen}
                        value={endValue}
                        onChange={(time, timeString: string) => {
                          setEndValue(time)
                          setEndTime(timeString)
                        }}
                        disabledHours={() => {
                          const minHour = startValue ? startValue.hours() : -1; // 比0小的
                          // const maxHour = max ? max.hours() : 24; // 比23大的
                          const maxHour = 24;
                          return Array.from({ length: 24 }, (v, k) => k).filter(
                            hour => hour < minHour || hour > maxHour
                          );
                        }}
                        disabledMinutes={endSelectedHour => {
                          const minMinutes =
                            startValue && endSelectedHour <= startValue.hours()
                              ? startValue.minutes()
                              : -1; // 比0小的
                          // const maxMinutes = max && endSelectedHour >= max.hours() ? max.minutes() : 60; // 比59大的
                          const maxMinutes = 60;
                          return Array.from({ length: 60 }, (v, k) => k).filter(
                            minutes => minutes < minMinutes || minutes > maxMinutes
                          );
                        }}
                        disabledSeconds={(startSelectedHour, startSelectedMinutes) => {
                          // TODO
                          return [];
                        }}
                        addon={() => (
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                              setEndOpen(false);
                            }}
                          >
                            Ok
                          </Button>
                        )}
                      />
                    )}
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          
        </div>
      </Modal>
    
    </div>
  )
}

const ViewActivityComponentView = Form.create()(ViewActivityComponent);

export default ViewActivityComponentView

