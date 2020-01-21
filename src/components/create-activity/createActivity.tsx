/* tslint:disable */
// react
import React, {useState} from 'react';

// third-party react library
import {
  Input, Form, Row, Col, Tooltip, Button, TimePicker
} from 'antd';
import moment from 'moment'

import { ICreateActivity } from "../../redux/actions/user/user.d";

interface DispatchProps {
  saveActivityAsync: (data: ICreateActivity) => void
  setSelectedView: (data: string) => void
  form: any
}

type Props = DispatchProps

const { TextArea } = Input;

const ROOT = {
  padding: 24,
  background: '#fff',
  minHeight: '90vh',
}

// @ts-ignore
export const CreateActivityComponent: React.FC = (props: Props) => {
  const { form, saveActivityAsync, setSelectedView } = props;
  const { getFieldDecorator } = form;
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let newObject = {
          ...values,
          startTime,
          endTime,
          dateCreated: moment(),
          dateUpdated: moment(),
        }
        saveActivityAsync(newObject)
        props.form.resetFields()
        setSelectedView('view')
      }
    });
  }
  
  return (
    <div
      style={ROOT}
    >
      <div
        style={{
          width: '50%',
          height: '100%',
          margin: 'auto',
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
                {getFieldDecorator('name', {
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
                {getFieldDecorator('description', {
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
                      placeholder="Select..."
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
                      placeholder="Select..."
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
          
          <div
            style={{
              width: '30%',
              margin: 'auto'
            }}
          >
          <Form.Item>
            <Button
              style={{
                backgroundColor: '#0c2136',
                color: '#FFFFFF',
                width: 100,
                borderRadius: 8,
                textTransform: "uppercase"
              }}
              size={'large'}
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </Form.Item>
        </div>
        
        </Form>
      </div>
    </div>
  )
}

const CreateActivityComponentView = Form.create()(CreateActivityComponent);

export default CreateActivityComponentView

