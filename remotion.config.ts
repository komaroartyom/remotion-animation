import {Config} from '@remotion/cli/config';

// GitHub Actions runners have no GPU: use ANGLE + SwiftShader software rendering.
Config.setChromiumOpenGlRenderer('swangle');
