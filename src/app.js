/**
 * 启动器文件
 */
import './components/'
import './directives/'
import './filters/'
import router from './routes/'
import app from './appx'

router.start(app, '#app')
