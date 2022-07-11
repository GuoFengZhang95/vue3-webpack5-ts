import { Plugin, App } from 'vue'
import {
  ConfigProvider,
  LocaleProvider,
  Button,
  Input,
  InputNumber,
  Checkbox,
  Badge,
  Tabs,
  Form,
  Select,
  Table,
  Modal,
  Row,
  Col,
  Spin,
  Descriptions,
  DatePicker,
  Drawer,
  Popover,
  Pagination,
  Dropdown,
  Menu,
  Tooltip,
  Tree,
  Radio,
  Cascader,
  Collapse,
  Divider,
  TreeSelect,
  TimePicker,
  Carousel,
  Switch,
  Image
} from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less' // 使用定制主题色的话需要引入less文件，配合webpack的less-loader
const components: Plugin[] = [
  ConfigProvider,
  LocaleProvider,
  Button,
  Input,
  InputNumber,
  Checkbox,
  Badge,
  Tabs,
  Form,
  Select,
  Table,
  Modal,
  Row,
  Col,
  Spin,
  Descriptions,
  DatePicker,
  Drawer,
  Popover,
  Pagination,
  Dropdown,
  Menu,
  Tooltip,
  Tree,
  Radio,
  Cascader,
  Collapse,
  Divider,
  TreeSelect,
  TimePicker,
  Carousel,
  Switch,
  Image
]
export default {
  install: (app: App) => {
    components.forEach(com => {
      app.use(com)
    })
    message.config({
      top: '80px',
      duration: 2,
      maxCount: 1,
    })
    app.config.globalProperties.$message = message
  }
}

