# Scene 002

## 画面目标

拆解上一个分镜引出的技术对象内部结构，一次只解释一层关系。

## 画面布局

浅灰白背景，中心技术卡片展开为三层 `LayerStack`；右侧保留一句结论，底部显示字幕。

## 动画步骤

1. 上一幕技术卡片通过 `objectMorph` 移到中心。
2. 三层结构由下到上依次 `slideUp`。
3. 当前讲解层 `highlightPulse`。
4. 其他层执行 `dimOthers`。
5. 层间箭头执行 `arrowDraw`。
6. 结论标签 `fadeIn`。

## 转场

`localReplace`。
